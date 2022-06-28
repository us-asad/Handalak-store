import { CategoryProductsContainer } from 'containers';
import { getSearchedProducts } from 'data/graphql';
import React from 'react'
import { SEO } from 'subcomponents';

export default function Search({ products, query }) {
  return (
    <div className='custom-container mx-auto mt-3 mb-9'>
      <SEO title={`${query} Search`} />
      <CategoryProductsContainer
        categoryName={`${query} so'rovi bo'yicha ${products.length} ta tovar topildi.`}
        products={products}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await getSearchedProducts(context.query.q);

  return {
    props: {
      products,
      query: context.query.q
    }
  }
}
