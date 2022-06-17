import { ProductCard } from 'components'
import { FilterContainer } from 'containers'
import { useRouter } from 'next/router'
import React from 'react'

export default function CategoryProductsContainer({ categoryName, products }) {
  const router = useRouter();

  const filterableProductKeys = products.map(prd => {
    const varieties = {}
    prd.varieties.forEach(vrt => {
      const vrtType = vrt.type.toLowerCase();
      varieties[vrtType] = varieties[vrtType] ? [...varieties[vrtType], vrt.name] : [vrt.name];
    });

    return { price: prd.price, brand: prd.manufacturer.name, varieties };
  });

  const queries = router.asPath.includes("?")
    ? Object.fromEntries(router.asPath.slice(router.asPath.indexOf("?") + 1)?.split("&")?.map(item => {
      const arr = item.split("=");
      arr[1] = decodeURIComponent(arr[1]).replaceAll("+", " ");
      return arr;
    }))
    : {};

  const filteredProducts = products.filter((_, i) => {
    let result = true;
    const prd = filterableProductKeys[i];

    if (!queries?.min_price && +queries?.min_price > prd.price) result = false
    if (!queries?.max_price && +queries?.max_price < prd.price) result = false;
    if (queries?.brands && !queries?.brands?.includes(prd?.brand)) result = false;

    return result;
  });


  return (
    <div>
      <div className='flex items-baseline mt-2.5 md:mb-5 lg:mb-10'>
        <h1 className='md:text-[30px] mr-7 font-bold text-black'>{categoryName}lar</h1>
      </div>
      <div className='grid grid-cols-5 gap-4 pb-10'>
        <FilterContainer products={products} />
        <div className='col-span-5 lg:col-span-4'>
          <div className='flex mb-8'>
            <p className='text-base font-medium mr-5 text-dc-gray-2'>Bo&lsquo;yicha saralash:</p>
            <ul className='grid grid-rows-1 grid-flow-col lg:gap-x-4 md:gap-x-2'>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0  font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Avval arzonlari
                </button>
              </li>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0  font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Avval qimmatlari
                </button>
              </li>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0  font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Yangilari
                </button>
              </li>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0  font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Chegirmada
                </button>
              </li>
            </ul>
          </div>
          <ul className='grid justify-items-stretch items-stretch md:grid-cols-3 xl:grid-cols-4 gap-2 w-full'>
            {filteredProducts.map(prd => (
              <li key={prd?.slug}>
                <ProductCard {...prd} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
