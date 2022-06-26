import { hideBodyOverflow } from 'data/functions';
import { useDispatch } from 'react-redux';
import { toggleShowCategoriesBar } from 'redux/slices/main';
import { MenuIcon } from './Icons';

export default function CategoryBtn({ changeStyles }) {
  const dispatch = useDispatch();

  const toggleCategoriesBar = () => {
    dispatch(toggleShowCategoriesBar(true));
    hideBodyOverflow(true);
  }

  return (
    <button
      onClick={toggleCategoriesBar}
      className={`flex items-center md:mr-4 lg:py-3 lg:px-5 md:p-3 md:border-2  lg:rounded-full md:rounded-xl w-max my-auto ${changeStyles ? "border-black text-black" : "border-white text-white"}`}
    >
      <span className="hidden lg:block mr-4 text-[17px]">Katalog</span>
      <MenuIcon pathclassname={`stroke-red ${!changeStyles && "md:stroke-white"}`} />
    </button>
  )
}
