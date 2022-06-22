import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ProductEventBtns } from 'components';
import { ProductDetails } from 'containers';
import { getDiscountedPrice, getFormattedPrice } from 'data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useRef, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { CompareFullBtn, ProductRates, ProductVarieties, ShareBox } from 'subcomponents';
import { DeliveryTruck, ShareIcon } from 'subcomponents/Icons';

export default function DesktopProductPage({
  mainImgs,
  setMainImgs,
  product,
  price,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: 'hover',
    placement: 'right',
    closeOnOutsideClick: false,
    visible: isVisible
  });
  const splideRef = useRef(null);
  const router = useRouter();
  const { name, discount, image, monthlyPay, price: totlaPrice, description, comments, slug, category, delivery, subtitle, manufacturer, seller, supplier, features, varieties, warrantyPeriod } = product;

  const handleClick = i => {
    splideRef.current.go(i)
  }

  return (
    <div>
      <ul className='flex items-center mb-2.5 font-medium text-red'>
        <li>
          <button
            onClick={() => router.back()}
            className='px-5 py-2.5 border-2 border-gray-800 rounded-full text-gray-800 text-base focus:outline-none mr-5 shadow-1'
          >Orqaga</button>
        </li>
        <li>
          <Link href="/">
            <a>Bosh Sahifa</a>
          </Link>
        </li>
        <li>
          <span className='px-5 text-gray-800 font-medium'>/</span>
          <Link href="/">
            <a>{category?.name}</a>
          </Link>
        </li>
        <li>
          <span className='px-5 text-gray-800 font-medium'>/</span>
          <Link href="/">
            <a>{manufacturer?.name}</a>
          </Link>
        </li>
      </ul>
      <h1 className='mt-2.5 mb-5 text-black text-3xl'>{name}</h1>
      <div className='grid grid-flow-col auto-cols-max gap-4'>
        <ProductRates comments={comments} />
        <p className='text-gray-800 text-base font-medium'>{comments.length} sharh{comments.length > 1 ? "lar" : ""}</p>
        <CompareFullBtn />
        <button
          ref={setTriggerRef}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className='flex items-center justify-center cursor-pointer text-red space-x-2 ml-2 relative after:w-[30px] after:h-[30px] after:block after:absolute after:top-0 after:-right-[10px]'
        >
          <ShareIcon />
          <span>Ulashish</span>
        </button>
        {isVisible && (
          <div
            ref={setTooltipRef}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            {...getTooltipProps({ className: 'tooltip-container' })}
            className='absolute z-[11] -top-[9px] left-[28px]'
          >
            <ShareBox slug={slug} />
          </div>
        )}
      </div>
      <div className='grid grid-cols-12 grid-row-2 gap-4 py-4 h-full w-full'>
        <div className='lg:col-span-5 md:col-span-6 col-start-1 lg:row-span-2'>
          <div className='grid grid-cols-4'>
            <ul className='col-span-1 space-y-4 max-h-[400px] overflow-y-auto scrollbar-hidden'>
              {mainImgs?.map(({ url }, i) => (
                <li
                  key={url}
                  className="flex justify-center"
                  onClick={() => handleClick(i)}
                >
                  <Image
                    src={url}
                    alt={name}
                    width={72}
                    height={72}
                  />
                </li>
              ))}
            </ul>
            <div className='col-span-3'>
              <Splide ref={splideRef} options={{ rewind: true, arrows: false, pagination: false }}>
                {mainImgs?.map(({ url }) => (
                  <SplideSlide key={url}>
                    <Image
                      src={url}
                      alt={name}
                      width={397}
                      height={397}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>
        <div className='lg:col-span-4 md:col-span-12'>
          <div className='flex items-center'>
            <p className='text-gray-800 text-[30px] font-bold mr-2.5'>{getFormattedPrice(getDiscountedPrice(price, discount))} so&lsquo;m</p>
            {discount && <p className='text-red text-base font-medium line-through'>{getFormattedPrice(price)} so&lsquo;m</p>}
          </div>
          {monthlyPay && <p className='text-left text-gray-500 text-base font-medium'>{getFormattedPrice(monthlyPay.monthlyPrice)} so&lsquo;mdan/oyiga</p>}
          <div>
            <p className='font-bold text-lg text-black leading-6'>Mahsulot haqida qisqacha</p>
            <p className='text-base leading-5 text-gray-700 py-2'>Kafolat muddati (oy): {warrantyPeriod || "yo'q"}</p>
            <p className='break-words text-base leading-5 text-gray-500 py-2'>
              {subtitle}
            </p>
            <ProductVarieties name={name} image={image} varieties={varieties} setMainImgs={setMainImgs} />
          </div>
        </div>
        <div className='lg:col-span-3 lg:row-start-auto md:col-span-4 md:col-start-8 md:row-start-1'>
          <div className='border border-solid border-dc-gray-5 rounded-3xl px-4 py-7'>
            <div className='pb-10 px-12 flex items-center justify-center overflow-hidden'>
              <Link href={`/manufacturer/${manufacturer?.slug}`}>
                <a>
                  <Image
                    src={manufacturer?.logo?.url}
                    alt={manufacturer?.name}
                    width={80}
                    height={80}
                  />
                </a>
              </Link>
            </div>
            <ul className='w-full grid grid-cols-1 gap-2'>
              <li>
                <p className='text-gray-400 text-base font-medium'>Yetkazib berish:</p>
                <div className='flex items-center'>
                  <div className='w-8 h-8 flex items-center justify-center rounded-lg bg-black mr-3'>
                    <DeliveryTruck />
                  </div>
                  <p className={`${delivery === "fast" ? "text-base" : "text-xl"} text-black font-medium leading-5`}>
                    {delivery === "fast" ? "Tezkor yetkazib berish" : "Manzilga qarab 4 soatdan 2 ish kunigacha yetkazib beriladi"}
                  </p>
                </div>
              </li>
              <li>
                <p className='text-dc-gray-2 text-base font-medium'>Yetkaziladigan ombor:</p>
                <p className='text-dc-gray-8 text-xl font-medium'>{supplier}</p>
              </li>
              <li>
                <p className='text-dc-gray-2 text-base font-medium'>Sotuvchi:</p>
                <p className='text-dc-gray-8 text-xl font-medium'>{seller}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='md:col-span-12 lg:col-start-6 lg:col-end-13'>
          <ProductEventBtns short />
        </div>
      </div>
      <ProductDetails {...product} />
    </div>
  )
}
