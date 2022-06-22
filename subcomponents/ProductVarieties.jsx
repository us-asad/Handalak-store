import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function ProductVarieties(props) {
  const { name, image, varieties, setMainImgs } = props;
  const formatted = {};
  const initialVariety = {};
  varieties.forEach(variety => {
    formatted[variety.type.toLowerCase()] = formatted[variety.type.toLowerCase()] ? [...formatted[variety?.type.toLowerCase()], variety] : [variety];
  });
  const formattedKeys = Object.keys(formatted);
  formattedKeys.forEach(key => {
    initialVariety[key] = formatted[key][0];
  });
  const [currVariety, setCurrVariety] = useState(initialVariety);

  const changeCurrVariety = (key, i) => setCurrVariety(prev => ({...prev, [key]: formatted[key][i]}));

  useEffect(() => {
    const keys = Object.keys(currVariety);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      setMainImgs(currVariety[key]?.images.length ? currVariety[key]?.images : image);
    }
  }, [currVariety]);

  return (
    <div>
      {formattedKeys.map(key => (
        <div key={key}>
          <p className='text-gray-400 text-base font-medium mb-4 capitalize'>{key}: {currVariety[key].name}</p>
          {key.toLocaleLowerCase() === "rangi"
            ? <ul className='flex flex-wrap gap-2.5 mb-4'>
              {formatted[key]?.map((item, i) => (
                <li key={`${item?.name}_${i}`} className='relative rounded-xl group'>
                  <button
                    onClick={() => changeCurrVariety(key, i)}
                    className={`flex py-1.5 px-0.5 rounded border-2 w-full ${item.name === currVariety[key].name ? "border-red" : "border-black"}`}
                  >
                    <Image
                      src={item?.images[0]?.url || image[0]?.url}
                      alt={name}
                      width={70}
                      height={75}
                    />
                  </button>
                  <div className='group-hover:block hidden absolute right-[unset] -left-[39px] bottom-[120%] bg-white custom-shadow rounded-lg z-50 min-w-[180px]'>
                    <div className='relative z-50 bg-white rounded-lg divide-y-2 py-2'>
                      <div className='flex items-center justify-center relative w-full p-2'>
                        <Image
                          src={item?.images[0]?.url || image[0]?.url}
                          alt={name}
                          width={180}
                          height={180}
                        />
                      </div>
                      <div className='py-2 px-4'>
                        {item?.name}
                      </div>
                    </div>
                    <div className='custom-shadow absolute -bottom-[8px] left-[45%] w-4 h-4 bg-white transform rotate-45' />
                  </div>
                </li>
              ))}
            </ul>
            : <ul className='flex flex-wrap gap-2.5 mb-4'>
              {formatted[key]?.map((item, i) => (
                <li key={`${item?.name}_${i}`} className='relative rounded-4xl overflow-hidden'>
                  <button
                    onClick={() => changeCurrVariety(key, i)}
                    className={`border-2 border-gray-800 rounded-full text-base font-medium py-2 px-[18px] ${item.name === currVariety[key].name ? "bg-black text-white" : "text-gray-800zz"}`}
                  >
                    {item?.name}
                  </button>
                </li>
              ))}
            </ul>}
        </div>
      ))}
    </div>
  )
}
