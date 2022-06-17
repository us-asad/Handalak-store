import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FilterBox } from 'subcomponents'

export default function FilterContainer({ products }) {
  const router = useRouter();
  const manufacturers = [...new Set(products.map(({ manufacturer: { name } }) => name))];
  const varieties = [];
  const arrangedVrts = {};
  products.map(product => product.varieties).forEach(prd => varieties.push(...prd));
  varieties.forEach(vrt => {
    const vrtType = vrt.type.toLowerCase();
    arrangedVrts[vrtType] = arrangedVrts[vrtType] ? [...arrangedVrts[vrtType], vrt.name] : [vrt.name];
  });

  return (
    <div className='relative col-span-1'>
      <div className='overflow-y-auto h-full bg-white w-full pr-2'>
        <div className='w-full'>
          <div className='lg:col-span-1'>
            <div className='bg-white p-5 lg:p-0 overflow-y-auto transform duration-300 translate-x-0'>
              <div className='grid grid-cols-1 gap-y-4'>
                <FilterBox type="input" name="Narx" />
                {manufacturers.length > 1 && <FilterBox type="checkbox" name="Brendlar" items={manufacturers} indexName="brands" />}
                {Object.keys(arrangedVrts).map(key => <FilterBox key={key} type="checkbox" name={key} items={arrangedVrts[key]} indexName={key} />)}
                <Link href={router.asPath.split("?")[0]}>
                  <a className='text-left border-0 focus:outline-none text-red my-2 p-0 font-bold'>Filtrni o&lsquo;chirish</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
