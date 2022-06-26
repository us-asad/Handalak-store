import { prdDetailSections } from 'data';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineStar } from "react-icons/ai";
import { MenuIcon } from "subcomponents/Icons";
import { HiOutlineDocumentText } from 'react-icons/hi';
import { PrdComments, PrdDescription, PrdInfo } from 'components';
import { useSelector } from 'react-redux';

export default function ProductDetails() {
  const { name, description, image, comments, slug, features, id } = useSelector(state => state.product);
  const router = useRouter();

  return (
    <div className='items-start lg:flex mt-5 lg:mt-0'>
      <div className='mb-4 rounded-md shadow-2 overflow-x-auto min-w-[300px] lg:w-2/6 lg:mb-0 lg:mr-4 lg:overflow-hidden xl:w-1/4'>
        <div className='overflow-hidden py-4 hidden lg:flex justify-center items-center'>
          <Image
            src={(image[0] && image[0].url) || "/loading.gif"}
            alt={name}
            width={120}
            height={120}
          />
        </div>
        <ul className='flex lg:flex-col'>
          {prdDetailSections.map(({name, slug, icon}) => (
            <li
              className={`lg:border-l-[6px] hover:text-red transition ease-out duration-200 ${router.query.productSlug[1] === slug ? "border-red" : "border-transparent"}`}
              key={icon}
            >
              <Link
                href={{
                  pathname: router.pathname,
                  query: {
                    productSlug: [router.query.productSlug[0], slug]
                  },
                }}
                shallow
                scroll={false}
              >
                <a className='flex items-center p-3 lg:p-4 w-full'>
                  <div className='mr-4 hidden lg:flex items-center'>
                    {
                      {
                        "document": <HiOutlineDocumentText className='text-red text-[22px]' />,
                        "info": <MenuIcon pathclassname="stroke-red" />,
                        "star": <AiOutlineStar className='text-red text-[22px]' />
                      }[icon]
                    }
                  </div>
                  <span>{name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full relative rounded-md shadow-2 p-4'>
        <h3 className='text-[18px] font-bold md:font-medium md:text-[30px] text-black mb-6'>
          {name} haqida&nbsp;
          {{
            undefined: "tavsif",
            "info": "umumiy",
            "comments": "izohlar"
          }[router.query.productSlug[1]]}
        </h3>
        {
          {
            undefined: <PrdDescription description={description} />,
            "info": <PrdInfo features={features} />,
            "comments": <PrdComments image={image} name={name} id={id} comments={comments} slug={slug} />
          }[router.query.productSlug[1]]
        }
      </div>
    </div>
  )
}
