import { useRef, useState } from "react";
import { signOut, signIn, useSession } from "next-auth/react";

const inputClassNames = "w-full px-3 py-4 text-base border-2 border-gray-700 outline-none rounded-full text-black";

export default function LoginModal({ toggleLoginModal }) {
  const [login, setLogin] = useState(true);
  const formRef = useRef(null);
  const { data: session, loading } = useSession();

  const handleAuth = e => {
    e.preventDefault();
    signIn("credentials", {
      name: formRef.current?.name?.value || "",
      email: formRef.current?.email?.value,
      password: formRef.current?.password?.value,
    });
  }

  return (
    <>
      <div className='fixed max-h-screen min-w-[30vw] translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 overflow-y-auto flex flex-col bg-white h-max z-[50] p-12 pb-8 space-y-4'>
        <h4 className='text-3xl leading-9 text-black'>
          {login
            ? "Kirish"
            : "Ro'yxatdan o'tish"
          }
        </h4>
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
          <button className={`w-full mt-4 block focus:outline-none cursor-pointer rounded-full text-base uppercase p-3 text-white bg-red`}>
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
      </div>
      <div
        onClick={() => toggleLoginModal(false)}
        className='fixed top-0 left-0 w-full h-full z-[49] bg-grad opacity-50'
      />
    </>
  );
}
