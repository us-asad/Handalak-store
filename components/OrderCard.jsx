import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { convertCurrency } from 'data/api';
import { getFormattedPrice } from 'data';

export default function OrderCard({ id, amount_subtotal, amount_total, coupon, customer_email, customer_name, date, products, address, email }) {
  const [amount, setAmount] = useState({ total: 0, subtotal: 0 });
  const [openImgs, setOpenImgs] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const copyId = () => navigator.clipboard.writeText(id);

  useEffect(() => {
    const changeAmount = async () => {
      const subtotal = await convertCurrency("USD", "UZS", amount_total);
      let total = null;
      if (amount_subtotal !== amount_total) {
        total = await convertCurrency("USD", "UZS", amount_subtotal);
      }

      setAmount({ subtotal, total });
    }

    changeAmount();
  }, []);

  return (
    <div className='rounded-xl bg-gray-100 p-5'>
      <div className='flex justify-between items-center text-[14px] sm:text-sm'>
        <div className='flex items-center space-x-4'>
          <p className='line-clamp-1'>{date}</p>
          <p className='line-clamp-1'>{products.length} ta mahsulot{products.length > 1 ? "lar" : ""}</p>
        </div>
        <p className='line-clamp-1'>
          id:
          <b
            onClick={copyId}
            className="cursor-copy ml-2"
          >{id.slice(0, 16)}...</b>
        </p>
      </div>
      <details
        onToggle={() => setOpenImgs(prev => !prev)}
        className='bg-[#cecece52] p-3 mt-5'
      >
        <summary className='flex items-center justify-between cursor-pointer'>
          <span>Mahsulotlarni ko&apos;rsatish</span>
          <BiChevronDown className={`text-[28px] ${openImgs && "rotate-180"}`} />
        </summary>
        <div className='overflow-x-auto'>
          <ul className='w-max flex space-x-4 p-4 border-t border-gray-300'>
            {products.map(prd => (
              <li
                key={prd.id}
                className="relative"
              >
                <Image
                  src={prd?.images[0]?.url}
                  alt="Handalak Ordered Product"
                  width={200}
                  height={200}
                />
                {prd.purchaseQty > 1 && <span className='absolute bottom-2 right-1 p-2 bg-black text-white rounded-md text-[10px]'>x{prd.purchaseQty}</span>}
              </li>
            ))}
          </ul>
        </div>
      </details>
      <details
        onToggle={() => setOpenDetails(prev => !prev)}
        className='bg-[#cecece52] p-3 mt-5'
      >
        <summary className='flex items-center justify-between cursor-pointer'>
          <span>Qo&apos;shimcha ma&apos;lumotlar</span>
          <BiChevronDown className={`text-[28px] ${openDetails && "rotate-180"}`} />
        </summary>
        <div className='overflow-x-auto'>
          <ul className='space-y-1 w-max p-4 !font-serif border-t border-gray-300'>
            {amount.total
              ? (
                <li className='font-sans space-x-2'>
                  <span>Umumiy:</span>
                  <b>{getFormattedPrice(amount.total)} so&apos;m</b>
                </li>
              )
              : null
            }
            {coupon && (
              <li className='font-sans space-x-2'>
                <span>coupon:</span>
                <b>{coupon?.code} -{coupon?.percentOff}%</b>
              </li>
            )}
            <li className='font-sans space-x-2'>
              <span>Jami:</span>
              <b>{getFormattedPrice(amount.subtotal)} so&apos;m</b>
            </li>
            <li className='font-sans space-x-2'>
              <span>Xarid qiluvchi emaili:</span>
              <b>{email}</b>
            </li>
            <li className='font-sans space-x-2'>
              <span>Qabul qiluvchi emaili:</span>
              <b>{customer_email}</b>
            </li>
            <li className='font-sans space-x-2'>
              <span>Qabul qiluvchi ismi:</span>
              <b>{customer_name}</b>
            </li>
            <li className='font-sans space-x-2'>
              <span>Qabul qilish manzili:</span>
              <b>{address?.country} {address?.state} {address?.city} {address?.line1} {address?.line2} {address?.postal_code}</b>
            </li>
          </ul>
        </div>
      </details>
    </div>
  )
}
