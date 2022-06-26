import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'redux/slices/toggleModal';
import { CloseBtn } from 'subcomponents';

const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function CallModal() {
  const [result, setResult] = useState({ ok: null, message: "" });
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const { callModal } = useSelector(state => state.toggleModal);
  const dispatch = useDispatch();

  const sendEmail = e => {
    e.preventDefault();

    if (!loading) {
      setLoading(true)
      emailjs.sendForm(emailjsServiceId, emailjsTemplateId, formRef.current, emailjsPublicKey)
        .then(() => {
          setResult({ ok: true, message: "So'rov muvaffaqiyatli qabul qilindi" });
          setLoading(false);
          setTimeout(() => {
            dispatch(toggleModal(["callModal", false]));
            setResult({ ok: null, message: '' })
          }, 2000)
        }, err => {
          setResult({ ok: false, message: err.text || "Unknown error, please try again later :(" });
          setLoading(false);
        });
    }
  }

  return (
    <div className={callModal ? "block" : "hidden"}>
      <div className='px-8 py-16 fixed z-[91] max-h-screen min-w-[30vw] translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 overflow-y-auto bg-white'>
        <CloseBtn
          modal="callModal"
          className="absolute top-4 right-3"
        />
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
            {loading ? "Yuborilmoqda..." : "Qo'ng'iroq qilishni so'rash"}
          </button>
        </form>
      </div>
      <div
        onClick={() => dispatch(toggleModal(["callModal", false]))}
        className='fixed z-[90] top-0 left-0 w-full h-full bg-grad opacity-50'
      />
    </div>
  )
}