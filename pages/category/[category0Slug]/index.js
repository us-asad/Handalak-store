import { CategoriesContainer, ColumnCategoriesContainer } from 'containers';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Category0() {
  const router = useRouter();
  const { categories } = useSelector(state => state.main);
  const category0 =  categories.find(category => category?.slug === router.query?.category0Slug);
  
  return (
    <div className='custom-container mx-auto'>
      <div className='hidden md:block'>
        <CategoriesContainer title={category0?.name} categories={category0?.categories1} starterSlug={`category/${category0?.slug}`} />
      </div>
      <div className='block md:hidden'>
        <ColumnCategoriesContainer title={category0?.name} categories={category0?.categories1} starterSlug={`category/${category0?.slug}`} />
      </div>
    </div>
  )
}