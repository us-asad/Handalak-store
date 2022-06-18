import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeMaxPrice, changeMinPrice } from 'redux/filterSlice';

export default function FilterCheckbox({ name }) {
  const router = useRouter();
  const [value, setValue] = useState(router.query[name] || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof value === "string") {
      if (name === "min_price") {
        dispatch(changeMinPrice(value));
      } else if (name === "max_price") {
        dispatch(changeMaxPrice(value))
      }

      const query = { ...router.query };
      if (value) query[name] = value;
      else delete query[name];

      router.push({
        pathname: router.pathname,
        query
      }, undefined,{
        scroll: false,
        shallow: true
      })
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