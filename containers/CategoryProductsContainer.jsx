import { MobileProductCard, ProductCard } from 'components'
import { FilterContainer, MobileFilterContainer } from 'containers'
import { getDiscountedPrice } from 'data/functions';
import { sortList } from "data";
import { useRouter } from 'next/router'
import { FilterIcon, SortIcon, UpIcon } from 'subcomponents/Icons';
import { ImArrowLeft2 } from "react-icons/im";
import { useRouteChanger } from 'hooks';
import { useState } from 'react';

const rspBtnClassNames = "inline-flex justify-center items-center rounded-md px-4 py-2 bg-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-100 outline-none";

export default function CategoryProductsContainer({ categoryName, products, subCategories }) {
  const router = useRouter();
  const [showSortDetails, setShowSortDetails] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const changeRoute = useRouteChanger();
  const manufacturers = [...new Set(products.map(({ manufacturer: { name } }) => name))];
  const filters = router.query;
  const allVarieties = [];
  const allArrangedVrts = {};
  const sortBy = router.query.sort_by;
  const changeSortBy = sort_by => changeRoute({ ...router.query, sort_by });
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

  const filteredProducts = products
    .filter(prd => {
      let result = true;
      const discountedPrice = getDiscountedPrice(prd.price);

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

      if (+filters?.min_price && +filters?.min_price > +discountedPrice) result = false;
      if (+filters?.max_price && +filters?.max_price < +discountedPrice) result = false;

      if (filters?.brands?.length && !filters?.brands?.includes(prd.manufacturer.name)) result = false;

      return result;
    })
    .sort((a, b) => {
      if (!sortBy) return;
      else if (sortBy === "price")
        return getDiscountedPrice(a.price, a.discount) - getDiscountedPrice(b.price, b.discount);
      else if (sortBy === "-price")
        return getDiscountedPrice(b.price, b.discount) - getDiscountedPrice(a.price, a.discount);
      else if (sortBy === "new")
        return (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0);
      else if (sortBy === "discount")
        return b.discount - a.discount;
    });

  return (
    <div>
      <div className='mb-2 mt-2.5 md:mb-5 lg:mb-10 flex flex-row items-center'>
        <ImArrowLeft2 className='block lg:hidden ml-4 m-5' />
        <h1 className='lg:text-[30px] mr-7 font-bold text-black text-2xl'>{categoryName}</h1>
      </div>
      <div className="flex lg:hidden justify-between mb-5">
        <div className="relative">
          <button
            onClick={() => setShowSortDetails(true)}
            className={rspBtnClassNames}
          >
            <span>{sortBy ? sortList.find(item => item.sort_by === sortBy)?.name : "Tartiblash"}</span>
            <SortIcon className="ml-2" />
          </button>
          <ul className={`rounded-xl shadow-1 absolute top-0 left-0 z-30 bg-white py-3 transition duration-150 ease-in ${showSortDetails ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            {sortList.map(({ name, sort_by }) => (
              <li
                key={sort_by}
                onClick={() => {
                  changeSortBy(sort_by)
                  setShowSortDetails(false);
                }}
                className="px-5 py-4 w-max text-[13px] cursor-pointer"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setShowFilter(true)}
          className={rspBtnClassNames}
        >
          <FilterIcon className="mr-2" />
          <span>Filterlash</span>
        </button>
      </div>
      <div className='grid grid-cols-5 gap-4 pb-10'>
        <FilterContainer subCategories={subCategories} manufacturers={manufacturers} allArrangedVrts={allArrangedVrts} />
        <MobileFilterContainer manufacturers={manufacturers} allArrangedVrts={allArrangedVrts} showFilter={showFilter} setShowFilter={setShowFilter} />
        <div className='col-span-5 lg:col-span-4'>
          <div className='hidden lg:flex mb-8'>
            <p className='text-base font-medium mr-5 text-dc-gray-2'>Bo&lsquo;yicha saralash:</p>
            <ul className='grid grid-rows-1 grid-flow-col lg:gap-x-4 md:gap-x-2'>
              {sortList.map(({ sort_by, name }) => (
                <li key={sort_by} className='flex items-center'>
                  <button
                    onClick={() => changeSortBy(sort_by)}
                    className={`border-0 focus:outline-none p-0 m-0 font-medium md:text-sm text-base flex items-baseline ${sort_by === sortBy ? "text-red" : "text-gray-800"}`}
                  >
                    {name}
                  </button>
                  {sort_by === router.query.sort_by && <UpIcon className="ml-2" />}
                </li>
              ))}
            </ul>
          </div>
          <ul className='hidden md:grid justify-items-stretch items-stretch md:grid-cols-3 xl:grid-cols-4 gap-2 w-full'>
            {filteredProducts.map(prd => (
              <li key={prd?.slug}>
                <ProductCard {...prd} />
              </li>
            ))}
          </ul>
          <ul className='my-5 mt-2 grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4'>
            {filteredProducts.map(prd => (
              <li key={prd?.slug}>
                <MobileProductCard {...prd} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
