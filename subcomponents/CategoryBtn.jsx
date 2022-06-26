import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/slices/toggleModal';
import { MenuIcon } from './Icons';

export default function CategoryBtn({ changeStyles }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleModal(["categoriesBar", true]))}
      className={`flex items-center md:mr-4 lg:py-3 lg:px-5 md:p-3 md:border-2  lg:rounded-full md:rounded-xl w-max my-auto ${changeStyles ? "border-black text-black" : "border-white text-white"}`}
    >
      <span className="hidden lg:block mr-4 text-[17px]">Katalog</span>
      <MenuIcon pathclassname={`stroke-red ${!changeStyles && "md:stroke-white"}`} />
    </button>
  )
}
