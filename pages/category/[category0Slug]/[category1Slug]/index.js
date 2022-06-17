import { CategoryProductsContainer } from 'containers'
import { getPorductsOfCatgory1 } from 'data/graphql';
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Category1({ products }) {
  const router = useRouter();
  const { categories } = useSelector(state => state);
  const category = categories.find(category => category?.slug === router.query?.category0Slug)?.categories1?.find(category => category?.slug === router.query?.category1Slug);

  return (
    <div className='custom-container mx-auto'>
      <CategoryProductsContainer categoryName={category?.name} products={products} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const products = await getPorductsOfCatgory1(context.params?.category1Slug);

  return {
    props: {
      products
    }
  }
}
