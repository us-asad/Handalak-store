import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { MdOutlineDone } from 'react-icons/md'

export default function FilterCheckbox({ name, type, indexName }) {
  const router = useRouter();
  const initialValue = type === "checkbox" ? router.query[indexName]?.includes(name) : router.query[indexName] || "";
  const [value, setValue] = useState(initialValue);

  const changeFilterQuery = query => {
    const queries = router.asPath.includes("?")
      ? Object.fromEntries(router.asPath.slice(router.asPath.indexOf("?") + 1)?.split("&")?.map(item => {
        const arr = item.split("=");
        arr[1] = decodeURIComponent(arr[1]);
        return arr;
      }))
      : {};
    const pathname = router.asPath.includes("?")
      ? router.asPath.slice(0, router.asPath.indexOf("?"))
      : router.asPath;

      if (query.value) queries[query.type] = query.value;

      router.push({
        pathname,
        query: query.value ? queries : {}
      });
  }

  useEffect(() => {
    const qIn = router.query[indexName];
    let a = "";
    const va = qIn
      ? `${qIn},${name}`
      : name;

    const va2 = qIn
      ? qIn.startsWith(name) && !qIn.includes(",")
        ? qIn?.replace(name, "")
        : qIn?.replace(`${name},`, "")
      : qIn?.replace(`,${name}`, "");

    if (value && type === "input") {
      changeFilterQuery({ type: indexName, value });
    } else if (type === "checkbox" && !decodeURIComponent(router.asPath).includes(name.replaceAll(" ", "+")) && value) {
      changeFilterQuery({ type: indexName, value: va });
    } else if (type === "checkbox" && decodeURIComponent(router.asPath).includes(name.replaceAll(" ", "+")) && !value) {
      changeFilterQuery({ type: indexName, value: va2 });
    }

  }, [value]);

  return (
    <>
      {type === "checkbox"
        ? (
          <label
            className='hover:text-red cursor-pointer text-black font-medium text-base flex items-center mt-5'
          >
            <span className='block relative mr-8'>
              <input
                onChange={() => setValue(prev => !prev)}
                checked={value}
                type="checkbox"
                className='w-0 h-0'
              />
              <span className={`w-6 h-6 rounded absolute top-0 left-0 flex justify-center items-center border border-solid border-dc-gray-4 ${value && "bg-grad"}`}>
                <MdOutlineDone className='text-white' />
              </span>
            </span>
            <span>{name}</span>
          </label>
        )
        : type === "input"
          ? (
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
          : <></>
      }
    </>
  )
}
// e => changeFilterQuery({ type: "min_price", value: e.target.value })