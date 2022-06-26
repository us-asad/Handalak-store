import { checkCookies, getCookie } from 'cookies-next';
import { getDiscountedPrice, getFormattedPrice } from 'data/functions';
import { getProductsById } from 'data/graphql';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { removeComparedPrd } from 'redux/slices/storeProduct';
import { ProductRates } from 'subcomponents';

export default function Compare({ products: p }) {
  const [products, setProducts] = useState(p);
  const dispatch = useDispatch();
  const allprdCtgs = products?.map(prd => [prd.category.name, prd]);
  const formatted = {};
  allprdCtgs?.forEach(item => {
      formatted[item[0]] = formatted[item[0]] ? [...formatted[item[0]], item[1]] : [item[1]];
    });
  let allFeatures = [];
  const [mainPrds, setMainPrds] = useState(formatted[Object.keys(formatted)[0]] || []);
  mainPrds?.map(item => item?.features?.map(({ featureName }) => featureName)).forEach(item => allFeatures.push(...item))
  allFeatures = [...new Set(allFeatures)];

  const removePrd = id => {
    setProducts(prev => {
      return prev.filter(prd => prd.id !== id)
    });
    dispatch(removeComparedPrd(id));
  }

  useEffect(() => {
    if (mainPrds?.length === 1) {
      setMainPrds(formatted[Object.keys(formatted)[0]] || []);
    } else {
      setMainPrds(formatted[mainPrds[0]?.category?.name])
    }
  }, [products]);

  return (
    <div className='custom-container mx-auto'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='font-bold text-[42px]'>Taqqoslash ro&apos;yxati</h1>
        <select
          onChange={e => setMainPrds(formatted[e.target.value])}
          className={`w-max appearance-none border-2 border-solid text-black border-gray-800 rounded-full mt-2 col-span-2 flex bg-white items-center px-4 py-3 outline-none ${!Object.keys(formatted).length && "hidden"}`}
        >
          default
          {Object.keys(formatted).map(key => (
            <option
              key={key}
              value={key}
            >{key}</option>
          ))}
        </select>
      </div>
      <div className='overflow-x-auto mt-4 mb-16'>
        <table className={`table mb-4 border border-gray-300 w-full min-w-max ${!products.length && "hidden"}`} >
          <thead>
            <tr>
              <th className='min-w-[200px] w-[20vw]'></th>
              {mainPrds?.map(prd => (
                <th key={prd?.slug} className='px-4 border-l border-gray-300 relative'>
                  <button
                    onClick={() => removePrd(prd?.id)}
                    className='focus:outline-none border-0 absolute z-[20] top-2 right-2 p-1 hover:bg-gray-300 duration-100 rounded-full'
                  >
                    <BiX className='text-[35px]' />
                  </button>
                  <Link href={`/product/${prd?.slug}`}>
                    <a>
                      <div className='flex justify-center overflow-hidden pt-6'>
                        <Image
                          src={prd?.image[0]?.url}
                          alt={prd?.name}
                          width={128}
                          height={128}
                        />
                      </div>
                      <div className='flex flex-col py-3 leading-5 text-black text-center'>
                        <h2 className='font-medium text-sm mb-1 line-clamp-1'>
                          {prd?.name}
                        </h2>
                        <p className='font-bold text-base line-clamp-1'>
                          {getFormattedPrice(getDiscountedPrice(prd?.price, prd?.discount))} so&apos;m
                        </p>
                      </div>
                    </a>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className='font-bold text-left px-4 py-2'>Reyting</th>
              {mainPrds?.map(prd => (
                <td
                  className='px-4 border-l border-gray-300'
                  key={prd?.slug}
                >
                  <ProductRates comments={prd?.comments} />
                </td>
              ))}
            </tr>
            {allFeatures?.map((feature, i) => (
              <tr key={`feature_${i}`}>
                <th className='font-bold text-left px-4 py-2'>{feature}</th>
                {mainPrds?.map(prd => (
                  <td
                    className='px-4 border-l border-gray-300'
                    key={prd.slug}
                  >
                    {prd?.features?.map(item => item.featureName === feature ? item.feature : "").join("") || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookieOptions = { req, res };
  const prdIds = checkCookies("comparedPrds", cookieOptions) ? JSON.parse(getCookie("comparedPrds", cookieOptions)) : [];
  const products = await getProductsById(prdIds);

  return {
    props: {
      products
    }
  }
}
