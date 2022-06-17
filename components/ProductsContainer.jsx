import React, { useEffect, useRef } from 'react'
import { ProductCard } from 'components'
import { ContainerBlockText } from 'subcomponents';

export default function ProductsContainer({ products, name, destination, column }) {
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollLeft = 300;
  }, []);

  return (
    <div className='flex items-center justify-center mt-8'>
      <div className='w-full relative flex flex-col justify-center custom-container mx-atuo overflow-x-hidden'>
        {name && destination && <ContainerBlockText name={name} destination={destination} />}
        <div
          ref={containerRef}
          className={column ? "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4" : "overflow-x-auto overflow-y-hidden flex flex-row-reverse space-x-3 scrollbar-hidden py-1 snap-x scroll-pl-6"}
        >
          {products?.map(product => <ProductCard column key={product?.slug} {...product} className={`snap-start ${!column ? "md:min-w-[280px]" : "!min-w-full"}`} />)}
        </div>
      </div>
    </div>
  )
}
