import React from 'react'
import HoveredBox from 'subcomponents/HoveredBox'

export default function CategoriesContainer({ title, categories, starterSlug }) {
  return (
    <div className='mb-20'>
      <h2 className='text-4xl font-bold text-c-gray-6 mb-4'>{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {categories?.map(item => <HoveredBox
          height="259px"
          imgClassName="w-[187px] h-[187px]"
          key={item?.slug}
          destination={`/${starterSlug}/${item?.slug}`}
          imageUrl={item?.image?.url}
          name={item?.name}
          smallScale
        />)}
      </div>
    </div>
  )
}
