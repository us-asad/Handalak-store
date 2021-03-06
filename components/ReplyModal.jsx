import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from 'redux/slices/product';
import { toggleDynamicModal } from 'redux/slices/toggleModal';
import { ModalContainer } from 'subcomponents';

export default function ReplyModal() {
  const [result, setResult] = useState({ ok: null, message: "" });
  const [replyTxt, setReplyTxt] = useState("")
  const { user: { user }, toggleModal: { reply: { state, data: { prdId, commentId } } } } = useSelector(state => state);
  const dispatch = useDispatch();

  const submitComment = async () => {
    const reply = {
      id: nanoid(),
      userId: user?.id,
      text: replyTxt,
      replies: [],
      createdAt: new Date().toLocaleString()
    }

    try {
      const updatedComments = await axios.put("/api/reply", { reply, prdId, commentId });

      if (updatedComments.data) {
        dispatch(setComments(updatedComments.data));
        setResult({ ok: true, message: "Izohga muvaffaqiyatli javob qoldirildi qoldirildi" });
        setTimeout(() => {
          dispatch(toggleDynamicModal(["reply", false]));
          setResult({ ok: null, message: "" });
        }, 2000);
      }
    } catch (ex) {
      setResult({ ok: false, message: ex?.response?.data?.message || ex.message || "Nomalum xato aniqlandi, Iltimos kerinroq qayta urinib ko'ring :`(" });
    }
  }

  return (
    <ModalContainer
      state={state}
      className="fixed max-h-screen min-w-[30vw] translate-x-[-50%] shadow-1 translate-y-[-50%] top-1/2 left-1/2 overflow-y-auto flex flex-col bg-white h-max py-16 px-12 w-full md:w-auto"
      zIndex={52}
      closeEvent={() => dispatch(toggleDynamicModal(["reply", false]))}
    >
      <p className='text-lg font-bold text-center'>Izohga javob yozish</p>
      <div>
        <textarea
          value={replyTxt}
          onChange={e => setReplyTxt(e.target.value)}
          className={`rounded-xl border-2 placeholder:text-red w-full p-4 h-44 resize-none focus:outline-none mt-3 mb-2 ${replyTxt ? "border-black" : "border-red"}`}
          placeholder="Fikr qoldiring"
        ></textarea>
      </div>
      <p className={`text-sm mb-3 ${result.ok === null ? "hidden" : result.ok ? "text-green-500" : "text-red"}`}>{result.message}</p>
      {!replyTxt && <p className='text-sm mb-3 text-red'>qo&apos;shimcha izoh maydoni to&apos;ldirilishi kerak</p>}
      <div className='flex items-center justify-between'>
        <button
          onClick={() => dispatch(toggleDynamicModal(["reply", false]))}
          className='py-2 px-6 bg-red text-white rounded-md focus:outline-none'
        >
          Bekor qilish
        </button>
        <button
          onClick={submitComment}
          disabled={!replyTxt}
          className='py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white font-550 rounded-md focus:outline-none'
        >
          Saqlash
        </button>
      </div>
    </ModalContainer >
  );
}
