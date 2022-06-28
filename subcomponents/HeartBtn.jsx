import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { addItems, removeItem } from 'redux/slices/storedProducts';
import { changeStoredProductState } from 'redux/slices/storeProduct';

export default function HeartBtn({ id }) {
  const dispatch = useDispatch();
  const { savedPrds } = useSelector(state => state.storeProduct);

  const handleClick = () => {
    dispatch(changeStoredProductState(["savedPrds", id]));

    if (savedPrds.includes(id))
      dispatch(removeItem(["savedProducts", id]));
  };

  return (
    <button
      onClick={handleClick}
      className='outline-none bg-white rounded-full border-0'
    >
      {savedPrds.includes(id)
        ? <AiFillHeart className='w-[22px] h-[22px] text-red' />
        : <AiOutlineHeart className='w-[22px] h-[22px] text-red' />
      }
    </button>
  )
}
