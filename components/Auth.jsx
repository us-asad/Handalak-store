import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'redux/slices/toggleModal';
import { registerUser, resetPassword, signInUser } from 'redux/slices/user';

const inputClassNames = "w-full px-3 py-4 text-base border-2 border-gray-700 outline-none rounded-full text-black";

export default function Auth() {
  const [login, setLogin] = useState(true);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    user: { error, message, loading, user },
  } = useSelector(state => state);

  const handleAuth = async e => {
    e.preventDefault();

    const { email: { value: email }, password: { value: password } } = formRef.current.elements;
    if (login)
      dispatch(signInUser({ email, password }));
    else
      dispatch(registerUser({ name: formRef.current.elements.name.value, password, email }));
  }

  useEffect(() => {
    if (!error && !loading && user)
      dispatch(toggleModal(["loginModal", false]))
  }, [error, loading, user, dispatch]);

  return (
    <>
      <h4 className='text-3xl leading-9 text-black'>
        {login
          ? "Kirish"
          : "Ro'yxatdan o'tish"
        }
      </h4>
      {error && <span className="text-red">{error}</span>}
      {message && <span className="text-green-600">{message}</span>}
      <form ref={formRef} onSubmit={handleAuth}>
        {!login && (
          <label className='space-y-2 block mb-4'>
            <span className='text-base text-left font-medium text-gray-400'>Ismingiz</span>
            <div className={inputClassNames}>
              <input
                type="text"
                name="name"
                placeholder="Qo'zivoy"
                className="w-full outline-none"
                minLength={3}
                maxLength={50}
                required
              />
            </div>
          </label>
        )}
        <label className='space-y-2'>
          <span className='text-base text-left font-medium text-gray-400'>Email</span>
          <div className={inputClassNames}>
            <input
              type="email"
              name="email"
              placeholder='mail@qozivoy.com'
              className="w-full outline-none"
              required
            />
          </div>
        </label>
        <label className='space-y-2 block mt-4'>
          <span className='text-base text-left font-medium text-gray-400 mt-4'>Parol</span>
          <div className={inputClassNames}>
            <input
              type="password"
              name="password"
              placeholder='qwerty12345678'
              minLength={6}
              maxLength={50}
              className="w-full outline-none"
              required
            />
          </div>
        </label>
        <p
          onClick={() => dispatch(resetPassword(formRef.current?.elements?.email?.value))}
          className={`text-sm text-gray-500 font-medium text-right cursor-pointer py-4 ${!login && "invisible h-0"}`}
        >
          Parolni unutdingizmi?
        </p>
        <button className={`w-full disabled:opacity-70 disabled:cursor-not-allowed block focus:outline-none cursor-pointer rounded-full text-base uppercase p-3 ${login ? "text-white bg-red" : "text-black border border-gray-900 bg-white"}`}>
          {login
            ? "Kirish"
            : "Ro'yxatdan o'tish"
          }
        </button>
        <p
          onClick={() => setLogin(prev => !prev)}
          className="text-sm text-gray-500 font-medium text-center cursor-pointer py-4"
        >
          {!login ? "Ro'yxatdan o'tganmisiz? Accountingizga kiring" : "Accountingiz yo'qmi? Ro'yxatdan o'ting"}
        </p>
      </form>
    </>
  )
}
