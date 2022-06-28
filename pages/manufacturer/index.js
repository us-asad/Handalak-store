import { getAllManufacturers } from 'data/graphql';
import React from 'react'
import HoveredBox from 'subcomponents/HoveredBox';

export default function Manufacturers({ manufacturers }) {
  return (
    <div className='custom-container mx-auto mt-3 mb-9'>
      <h1 className='text-3xl text-black mb-5'>Brend sahifasi</h1>
      <p className='text-sm leading-4 text-black font-medium mb-5'>brend tarixi, yangiliklar, ishlab chiqarish texnologiyalari haqidagi maqolalar va boshqalar</p>
      <div className='flex flex-wrap justify-center md:justify-start gap-5'>
        {manufacturers?.map(manufacturer => <HoveredBox
          key={manufacturer?.slug}
          destination={`/manufacturer/${manufacturer?.slug}`}
          imageUrl={manufacturer?.logo?.url}
          name={manufacturer?.name}
          imgClassName="w-[100px] h-[100px]"
          smallScale
          height={160}
        />)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const manufacturers = await getAllManufacturers();

  return {
    props: { manufacturers }
  }
}

