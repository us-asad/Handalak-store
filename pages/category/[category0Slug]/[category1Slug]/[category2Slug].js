import { CategoryProductsContainer } from 'containers';
import { getPorductsOfCatgory2 } from 'data/graphql';
import React from 'react'

export default function Categorys2({ name, products }) {
  return (
    <div className='custom-container mx-auto'>
      <CategoryProductsContainer categoryName={name} products={products} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const category = await getPorductsOfCatgory2(context.params.category2Slug);

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
