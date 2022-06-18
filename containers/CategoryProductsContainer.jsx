import { ProductCard } from 'components'
import { FilterContainer } from 'containers'
import { useRouter } from 'next/router'

export default function CategoryProductsContainer({ categoryName, products }) {
  const router = useRouter();
  const filters = router.query;
  const allVarieties = [];
  const allArrangedVrts = {};
  products.map(product => product.varieties).forEach(prd => allVarieties.push(...prd));
  allVarieties.forEach(vrt => {
    const vrtType = vrt.type.toLowerCase();
    allArrangedVrts[vrtType] = allArrangedVrts[vrtType] ? [...allArrangedVrts[vrtType], vrt.name] : [vrt.name];
  });

  const filterVrts = Object.fromEntries(Object.keys(filters).map(item => {
    const allKeys = Object.keys(allArrangedVrts);
    for (let i = 0; i < allKeys.length; i++) {
      if (allKeys[i] === item) return [[item], filters[item]];
    }
  }).filter(item => item !== undefined));
  
  const filteredProducts = products.filter(prd => {
    let result = true;
    const discountedPrice = prd.price - (prd.price * (prd.discount / 100));

    const arrangedVrts = {};
    prd.varieties.forEach(vrt => {
      const vrtType = vrt.type.toLowerCase();
      arrangedVrts[vrtType] = arrangedVrts[vrtType] ? [...arrangedVrts[vrtType], vrt.name] : [vrt.name];
    });

    if (filterVrts) {
      for (let i = 0; i < Object.keys(filterVrts).length; i++) {
        const key = Object.keys(filterVrts)[i];
        if (arrangedVrts[key]) {
          for (let j = 0; j < arrangedVrts[key].length; j++) {
            const item = arrangedVrts[key][j];
            if (filterVrts[key].includes(item)) {
              result = true;
              break;
            } else result = false;
          }
        } else result = false
      }
    }

    if (filters?.min_price && filters?.min_price > discountedPrice) result = false;
    if (filters?.max_price && filters?.max_price < discountedPrice) result = false;

    if (filters?.brands?.length && !filters?.brands?.includes(prd.manufacturer.name)) result = false;

    return result;
  });

  return (
    <div>
      <div className='flex items-baseline mt-2.5 md:mb-5 lg:mb-10'>
        <h1 className='md:text-[30px] mr-7 font-bold text-black'>{categoryName}lar</h1>
      </div>
      <div className='grid grid-cols-5 gap-4 pb-10'>
        <FilterContainer products={products} allArrangedVrts={allArrangedVrts} />
        <div className='col-span-5 lg:col-span-4'>
          <div className='flex mb-8'>
            <p className='text-base font-medium mr-5 text-dc-gray-2'>Bo&lsquo;yicha saralash:</p>
            <ul className='grid grid-rows-1 grid-flow-col lg:gap-x-4 md:gap-x-2'>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0 font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Avval arzonlari
                </button>
              </li>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0 font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Avval qimmatlari
                </button>
              </li>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0 font-medium md:text-sm text-base flex items-baseline text-gray-800'>
                  Yangilari
                </button>
              </li>
              <li className='flex items-center'>
                <button className='border-0 focus:outline-none p-0 m-0 font-medium md:text-sm text-base flex items-baseline text-gray-800'>
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
