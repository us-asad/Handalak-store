import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function CallModal({ setShowModal }) {
  const [result, setResult] = useState({ ok: null, message: ""});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
console.log(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
  const sendEmail = e => {
    e.preventDefault();

    if (!loading) {
      setLoading(true)
      emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, formRef.current, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        .then(result => {
          console.log(result)
          setResult({ ok: true, message: "So'rov muvaffaqiyatli qabul qilindi" });
          setLoading(false);
        }, err => {
          console.error(err)
          setResult({ ok: false, message: err.text || "Unknown error, please try again later :(" });
          setLoading(false);
        });
    }
  }

  return (
    <div>
      <div className='px-8 py-16 fixed z-[91] max-h-screen min-w-[30vw] translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 overflow-y-auto bg-white'>
        <form
          className='grid grid-cols-1 gap-y-4 text-black '
          ref={formRef}
          onSubmit={sendEmail}
        >
          <p className='text-3xl leading-9 text-left text-black'>Qayta aloqa</p>
          {result.ok && <p className='text-sm text-green-500'>{result.message}</p>}
          <input
            className="p-4 rounded-full focus-visible:outline-none border-2 border-red placeholder:text-red"
            placeholder='Ism'
            name="name"
            minLength={3}
            maxLength={50}
            required
          />
          <div>
            <div className='px-4 w-full flex items-center divide-x-2 rounded-full border-2 border-red divide-red'>
              <select
                name="number_code"
                defaultValue="+998"
                className='outline-none text-gray-600 '
              >
                <option value="+998">+998</option>
              </select>
              <input
                className="p-4 focus-visible:outline-none placeholder:text-red"
                placeholder='Raqam'
                name="number"
                minLength={9}
                maxLength={9}
                required
              />
            </div>
            <span className="text-sm text-center text-red">{result.ok === false && result?.message}</span>
          </div>
          <textarea
            className='p-4 rounded-2xl border-2 border-red w-full focus:outline-none resize-none bg-transparent placeholder:text-red'
            placeholder='Fikr qoldiring'
            name="message"
            maxLength={1000}
            minLength={3}
            required
          ></textarea>
          <button
            disabled={loading}
            className='focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 rounded-full font-bold text-base uppercase text-white p-3 bg-red'
          >
            Qo&apos;ng&apos;iroq qilishni so&apos;rash
          </button>
        </form>
      </div>
      <div
        onClick={() => setShowModal(false)}
        className='fixed z-[90] top-0 left-0 w-full h-full bg-grad opacity-50'
      />
    </div>
  )
}