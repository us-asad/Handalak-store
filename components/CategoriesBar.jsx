import { useDispatch, useSelector } from 'react-redux';
import { BiX } from "react-icons/bi";
import { changeMainCategory } from 'redux/slices/main';
import Link from 'next/link';
import { DetailItem } from 'subcomponents';
import { toggleModal } from 'redux/slices/toggleModal';

export default function CategoriesBar() {
  const { main: { categories, mainCategory }, toggleModal: { categoriesBar } } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`hidden md:block h-screen w-[92vw] fixed top-0 z-[999] bg-white text-black ${categoriesBar ? "left-0 custom-transition" : "-left-full"}`}>
        <span
          onClick={() => dispatch(toggleModal(["categoriesBar", false]))}
          className='absolute top-2 -right-9 bg-red text-white cursor-pointer z-30 text-[30px] rounded-full'
        >
          <BiX />
        </span>
        <div className='h-screen px-4 overflow-y-hidden grid grid-cols-7 gap-x-2'>
          <div className='py-4 xl:pr-4 col-span-2 border-r-2 border-gray-200 overflow-y-auto'>
            <ul>
              {categories?.map(category => (
                <li key={category.slug}>
                  <button
                    onClick={() => dispatch(changeMainCategory(category))}
                    className={`w-full text-left font-normal font-raleway text-[17px] py-2 px-4 rounded-xl ${mainCategory?.slug === category.slug ? "bg-red text-white" : "hover:text-red"}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='lg:pl-14 md:pl-4 py-4 col-span-5 overflow-y-auto'>
            <h3 className='font-normal xl:text-2xl md:text-xl mb-6 text-black'>{mainCategory?.name}</h3>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
              {mainCategory?.categories1?.map(category => (
                <div key={category?.slug}>
                  <Link href={`/category/${mainCategory?.slug}/${category?.slug || ""}`}>
                    <a className='text-xl font-medium mb-3.5 hover:text-red text-gray-800'>
                      {category?.name}
                    </a>
                  </Link>
                  <ul>
                    {category?.categories2?.map(subcategory => (
                      <li key={subcategory?.slug}>
                        <Link href={`/category/${mainCategory?.slug}/${category?.slug}/${subcategory?.slug || ""}`}>
                          <a className='text-[15px] mb-1 hover:text-red text-[#818181] font-normal'>
                            {subcategory?.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(toggleModal(["categoriesBar", false]))}
        className={`fixed top-0 left-0 w-full hidden h-full z-20 bg-[#000000a7] ${categoriesBar ? "md:block" : "hidden"}`}
      />
      <div className={`block md:hidden fixed top-0 left-0 w-full h-screen overflow-y-auto p-4 z-30 bg-white ${categoriesBar ? "left-0" : "-left-full"}`}>
        <div>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-2xl font-bold'>Kategoriyalar</h3>
            <button
              onClick={() => dispatch(toggleModal(["categoriesBar", false]))}
              className='text-red text-[35px]'
            >
              <BiX />
            </button>
          </div>
          <ul>
            {categories?.map(category => <DetailItem key={category?.slug} category={category} />)}
          </ul>
        </div>
      </div>
    </>
  )
}
