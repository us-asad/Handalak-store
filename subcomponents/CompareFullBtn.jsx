import { useRouter } from 'next/router';
import { FiCopy } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { changeStoredProductState } from 'redux/slices/storeProduct';

export default function CompareFullBtn({ id }) {
  const dispatch = useDispatch();
  const { storeProduct: { comparedPrds } } = useSelector(state => state);

  return (
    <button
      onClick={() => dispatch(changeStoredProductState(["comparedPrds", id]))}
      className={`flex items-center justify-center ${comparedPrds.includes(id) ? "text-red" : "text-gray-400"}`}
    >
      <FiCopy />
      <p className='text-base font-semibold ml-3'>{comparedPrds.includes(id) ? "Taqqoslashdan o'chirish" : "Taqqoslashdan qo'shish"}</p>
    </button>
  )
}
