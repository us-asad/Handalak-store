import Image from "next/image";
import { BiCopy } from "react-icons/bi";

const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export default function ShareBox({ slug }) {
  const shareUrl = `${url}/product/${slug}`;

  return (
    <ul className='p-6 bg-white rounded-[6px] text-[16px] custom-shadow-rounded'>
      <li className='flex justify-center items-center space-x-4 cursor-pointer my-2 group hover:text-blue-500 w-max'>
        <BiCopy className="text-green-700 group-hover:text-blue-500 w-[30px] h-[30px] text-[16px]" />
        <span>Nusxa olish</span>
      </li>
      <li className='my-2 group hover:text-blue-500 w-max'>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          rel="noreferrer"
          target="_blank"
          className="flex justify-center items-center space-x-4"
        >
          <Image
            src="/social/facebook.svg"
            alt="Olcha Facebook"
            width={30}
            height={30}
          />
          <span>Facebook</span>
        </a>
      </li>
      <li className='my-2 group hover:text-blue-500 w-max'>
        <a
          href="https://instagram.com"
          rel="noreferrer"
          target="_blank"
          className="flex justify-center items-center space-x-4"
        >
          <Image
            src="/social/insta.svg"
            alt="Olcha Instagram"
            width={30}
            height={30}
          />
          <span>Instagram</span>
        </a>
      </li>
      <li className='my-2 group hover:text-blue-500 w-max'>
        <a
          href={`https://t.me/share/url?url=${shareUrl}`}
          rel="noreferrer"
          target="_blank"
          className="flex justify-center items-center space-x-4"
        >
          <Image
            src="/social/tg.svg"
            alt="Olcha Telegram"
            width={30}
            height={30}
          />
          <span>Telegram</span>
        </a>
      </li>
    </ul>
  )
}
