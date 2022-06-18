import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function FilterCheckbox({ name, changeRoute }) {
  const router = useRouter();
  const [value, setValue] = useState(router.query[name] || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof value === "string") {
      const query = { ...router.query };
      if (value) query[name] = value;
      else delete query[name];

      changeRoute(query);
    }
  }, [value]);

  return (
    <label
      htmlFor={name}
      className='text-dc-gray-2 text-base font-medium py-3 bg-white border-r border-solid border-gray-200 flex'
    >
      <input
        type="number"
        onChange={e => setValue(e.target.value)}
        value={value}
        id={name}
        className='bg-transparent px-2 outline-none text-base font-medium text-black w-full'
      />
    </label>
  )
}