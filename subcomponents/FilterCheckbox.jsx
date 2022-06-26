import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import { useRouteChanger } from 'hooks';

export default function FilterCheckbox({ name, indexKey }) {
  const router = useRouter();
  const [checked, setChecked] = useState(router.query[indexKey]?.includes(name) || "");
  const changeRoute = useRouteChanger();

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
          let brands = router.query.brands?.split(",");
          brands.splice(brands.indexOf(name), 1);
          brands = brands.join(",");
          const query = { ...router.query }

          if (brands) query.brands = brands;
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
          const vrtsQry = vrts.split(",").filter(vrt => vrt !== name).join(",");

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
