import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart({ title, subtitle = "Bizning katalogimizdan keng assortimentidan mahsulot tanlashni boshlang." }) {
  return (
    <div className='flex flex-col justify-center items-center my-20 mx-4'>
      <Image
        src="/empty_basket.png"
        alt="Empty Basket"
        width={280}
        height={240}
      />
      <h1 className='text-gray-700 md:text-3xl text-2xl my-4'>
        {title}
      </h1>
      <p className='text-gray-300 md:text-xl text-sm'>
        {subtitle}
      </p>
      <Link href="/">
        <a className='w-80 text-white opacity-80 text-center hover:opacity-100 bg-red focus:outline-none md:w-96 py-4 rounded-lg leading-4 text-base font-bold mt-10 mb-4'>
          Asosiy saxifaga
        </a>
      </Link>
    </div>
  )
}
