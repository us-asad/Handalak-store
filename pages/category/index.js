import { CategoriesContainer } from 'containers'
import React from 'react'
import { useSelector } from 'react-redux'
import { SEO } from 'subcomponents';

export default function CategoriesHome() {
  const { categories } = useSelector(state => state.main);

  return (
    <div className='custom-container mx-auto'>
      <SEO title="Categories" />
      <CategoriesContainer title="Mahsulotlar katalogi" categories={categories} starterSlug="category" />
    </div>
  )
}
