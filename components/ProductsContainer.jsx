import { ProductCard } from 'components'
import { ContainerBlockText } from 'subcomponents';

export default function ProductsContainer({ products, name, destination, column }) {
  return (
    <div className='flex items-center justify-center mt-8'>
      <div className='w-full relative flex flex-col justify-center custom-container mx-atuo'>
        {name && destination && <ContainerBlockText name={name} destination={destination} />}
        <div className='overflow-x-auto scrollbar-hidden py-1 snap-x scroll-pl-6'>
          <div className={column ? "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4" : "space-x-3 flex"}>
            {products?.map(product => <ProductCard column key={product?.slug} {...product} className={`snap-start ${!column ? "md:min-w-[280px]" : "!min-w-full"}`} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
