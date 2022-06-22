import { CategoryProductsContainer } from 'containers'
import { getPorductsOfCatgory1 } from 'data/graphql';
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Category1({ products, categories2 }) {
  const arrangedPrds = categories2?.filter(item => item.products.length).map(item => item.products) || [];
  const allProducts = [...products];

  for (let i = 0; i < arrangedPrds.length; i++) {
    const prds = arrangedPrds[i];
    for (let j = 0; j < prds.length; j++) {
      allProducts.push(prds[j]);
    }
  }

  const router = useRouter();
  const { categories } = useSelector(state => state.main);
  const category = categories.find(category => category?.slug === router.query?.category0Slug)?.categories1?.find(category => category?.slug === router.query?.category1Slug);

  return (
    <div className='custom-container mx-auto'>
      <CategoryProductsContainer subCategories={categories2} categoryName={category?.name} products={allProducts} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const category = await getPorductsOfCatgory1(context.params?.category1Slug);

  if (!category?.slug)
    return {
      notFound: true
    };

  return {
    props: {
      ...category
    }
  }
}
