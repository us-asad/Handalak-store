import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { FilterBox, SubCategories } from 'subcomponents'

export default function FilterContainer({ allArrangedVrts, subCategories, manufacturers }) {
  const router = useRouter();

  return (
    <div className='relative col-span-1 hidden lg:block'>
      <div className='overflow-y-auto h-full bg-white w-full pr-2'>
        <div className='w-full'>
          <div className='lg:col-span-1'>
            <div className='bg-white p-5 lg:p-0 overflow-y-auto transform duration-300 translate-x-0'>
              <div className='grid grid-cols-1 gap-y-4'>
                <SubCategories subCategories={subCategories} />
                <FilterBox type="price" name="Narx" />
                {manufacturers.length > 1 && <FilterBox type="checkbox" name="Brendlar" indexKey="brands" items={manufacturers} />}
                {Object.keys(allArrangedVrts).map(key => <FilterBox key={key} indexKey={key} type="checkbox" name={key} items={allArrangedVrts[key]} />)}
                <Link href={router.asPath.split("?")[0]} scroll={false} shallow>
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
