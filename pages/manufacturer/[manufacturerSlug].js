import { CategoryProductsContainer } from 'containers';
import { getManufacturerProducts } from 'data/graphql';
import React from 'react'
import { SEO } from 'subcomponents';

export default function Manufacturer({ manufacturer }) {
  return (
    <div className='custom-container mx-auto mt-3 mb-9'>
      <SEO title={manufacturer?.name} />
      <CategoryProductsContainer
        categoryName={`${manufacturer.name} brendi mahsulotlari`}
        products={manufacturer.products}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const manufacturer = await getManufacturerProducts(context.params.manufacturerSlug);

  if (!manufacturer?.id) return { notFound: true };

  return {
    props: {
      manufacturer
    }
  }
}
