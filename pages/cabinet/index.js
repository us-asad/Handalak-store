import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAccount } from 'redux/slices/user';

export default function Cabinet() {
  const { user, loading } = useSelector(state => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  if (loading) return null;

  if (!user?.id) {
    router.push("/login");
    return null
  }

  return (
    <div className='custom-container mx-auto space-y-4 mt-3 mb-10'>
      <h1 className='md:text-4xl text-2xl'>Assalomu aleykum <b>{user?.name}</b></h1>
      <h3 className='md:text-xl text-md'>Emailingiz: <b>{user?.email}</b></h3>
      <div className='flex md:space-x-4 flex-col md:flex-row space-y-4 md:space-y-0 text-center pt-5 items-center justify-center md:justify-start'>
        <Link href="/cabinet/orders">
          <a className='py-2 px-4 border-2 border-green-500 text-white bg-green-500 hover:bg-white hover:text-green-500 rounded-full text-sm shadow-1'>
            Mening buyurtmalarim
          </a>
        </Link>
        <Link href="/cabinet/favorite">
          <a className='py-2 px-4 border-2 border-red text-white bg-red hover:bg-white hover:text-red rounded-full text-sm shadow-1'>
            Sevimli mahsulotlar
          </a>
        </Link>
        <button
          onClick={() => dispatch(signOutAccount())}
          className='py-2 px-4 text-red underline text-sm'
        >
          Saytdan chiqish
        </button>
      </div>
    </div>
  )
}
