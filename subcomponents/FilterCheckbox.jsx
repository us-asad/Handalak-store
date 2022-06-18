import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { MdOutlineDone } from 'react-icons/md'

export default function FilterCheckbox({ name, indexKey, changeRoute }) {
  const router = useRouter();
  const [checked, setChecked] = useState(router.query[indexKey]?.includes(name) || null);

  useEffect(() => {
    if (typeof checked === "boolean") {
      if (indexKey === "brands") {
        if (checked && !router.query.brands?.includes(name)) {
          const query = {
            ...router.query,
            brands: router.query?.brands ? `${router.query?.brands},${name}` : name
          };

          changeRoute(query)
        } else if (!checked) {
          const brands = router.query.brands;
          const brandsQry = brands?.startsWith(name) && !brands?.includes(",")
            ? brands?.replace(name, "")
            : brands?.endsWith(name)
              ? brands?.replace(`,${name}`, "")
              : brands?.replace(`${name},`, "");
          const query = { ...router.query }
          if (brandsQry) query.brands = brandsQry;
          else delete query.brands;

          changeRoute(query)
        }
      } else {
        if (checked && !router.query[indexKey]?.includes(name)) {
          const query = {
            ...router.query,
            [indexKey]: router.query[indexKey] ? `${router.query[indexKey]},${name}` : name
          };

          changeRoute(query);
        } else if (!checked) {
          const vrts = router.query[indexKey];
          const vrtsQry = vrts?.startsWith(name) && !vrts?.includes(",")
            ? vrts?.replace(name, "")
            : vrts?.endsWith(name)
              ? vrts?.replace(`,${name}`, "")
              : vrts?.replace(`${name},`, "");
          const query = { ...router.query }
          if (vrtsQry) query[indexKey] = vrtsQry;
          else delete query[indexKey];

          changeRoute(query)
        }
      }
    }
  }, [checked]);

  return (
    <label
      className='hover:text-red cursor-pointer text-black font-medium text-base flex items-center mt-5'
    >
      <span className='block relative mr-8'>
        <input
          onChange={() => setChecked(prev => !prev)}
          checked={checked}
          type="checkbox"
          className='w-0 h-0'
        />
        <span className={`w-6 h-6 rounded absolute top-0 left-0 flex justify-center items-center border border-solid border-dc-gray-4 ${checked && "bg-grad"}`}>
          <MdOutlineDone className='text-white' />
        </span>
      </span>
      <span>{name}</span>
    </label>
  )
}
