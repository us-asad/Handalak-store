import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { usePopperTooltip } from 'react-popper-tooltip';
import { HeartBtn, ShareBtn, CompareBtn } from 'subcomponents';
import { DeliveryTruck } from 'subcomponents/Icons';
import { getFormattedPrice } from 'data/functions';
import { ShareBox } from 'subcomponents';
import { toggleDynamicModal } from 'redux/slices/toggleModal';
import { useDispatch } from 'react-redux';

export default function ProductCard(props) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
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

  const { name, discount, image, monthlyPay, price: totlaPrice, slug, category, delivery, className, id } = props;
  const price = totlaPrice - (totlaPrice * (discount / 100));

  return (
    <>
      <div className={`w-52 md:w-full h-full rounded-lg transition duration-300 hover:shadow-1 flex flex-col justify-between py-8 p-4 relative ${className}`}>
        <Link href={`/product/${slug || ""}`}>
          <a className='absolute inset-0'></a>
        </Link>
        <div className='md:w-[200px] md:h-[200px] mx-auto w-[129px] h-[129px] flex items-center justify-center relative'>
          <Image
            src={image[0].url}
            alt={name}
            layout="fill"
            objectFit="contain"
          />
          {delivery === "fast" && (
            <div className='absolute left-0 -bottom-1 z-100 shadow-2xl bg-gray-900 p-1.5 rounded-md'>
              <DeliveryTruck />
            </div>
          )}
        </div>
        <div className='absolute top-4 right-2 z-20 shadow-2xl'>
          <HeartBtn id={id} />
        </div>
        <div className='absolute top-12 right-2 shadow-2xl'>
          <div
            ref={setTriggerRef}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            <ShareBtn className="after:w-[30px] after:h-[30px] after:block after:absolute after:top-0 after:left-[6px]" />
          </div>
          {visible && (
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
        <div className='flex flex-col pt-4'>
          <Link href={`/category/${category?.slug || ""}`}>
            <a className='relative md:text-black line-clamp-1 mb-1 hover:text-red font-semibold md:font-normal text-[#8a8a8a]'>{category?.name}</a>
          </Link>
          <div className='md:block hidden'>
            <div className='flex flex-col font-bold leading-5 mb-2'>
              <span className='text-red text-sm line-through h-6'>{(discount && discount > 0 && `${getFormattedPrice(totlaPrice)} so'm`) || ""}</span>
              <p>
                <span>{getFormattedPrice(price)}</span> so&lsquo;m
              </p>
            </div>
            <div className='h-7 text-sm leading-5'>
              {monthlyPay
                ? <span className='bg-red text-white font-bold px-2 py-0.5 rounded-full'>{`${getFormattedPrice(monthlyPay?.monthlyPrice)} so'mdan/oyiga`}</span>
                : null
              }
            </div>
            <p className='h-12 text-[13px] md:text-[17px] text-gray-800 font-sans font-light leading-5 my-2.5 line-clamp-2'>{name}</p>
            <div className='flex items-center justify-between mt-2 leading-5'>
              <button
                onClick={() => dispatch(toggleDynamicModal(["product", true, props]))}
                className='w-40 relative shadow-xl text-tiny font-medium border rounded-full py-2 px-5 mr-4 border-gray-800 text-gray-800'
              >
                Xarid qilish
              </button>
              <CompareBtn color="#000" id={id} />
            </div>
          </div>
          <div className='block md:hidden'>
            <p className='text-sm leading-snug text-black font-medium my-2 line-clamp-2 h-10'>{name}</p>
            <p className='text-sm text-gray-500 pb-1 line-clamp-1 h-5'>{monthlyPay && `${getFormattedPrice(monthlyPay?.monthlyPrice)} so'mdan/oyiga`}</p>
            <div className='mt-1'>
              <p className='h-3 text-red text-sm font-bold leading-5 line-through'>{discount && discount > 0 && `${getFormattedPrice(totlaPrice)}so'm`}</p>
              <div className='flex justify-between items-center'>
                <p className='font-semibold text-lg text-black leading-6 mt-2 line-clamp-1 '>{getFormattedPrice(price)}so&lsquo;m</p>
                <CompareBtn color="black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
