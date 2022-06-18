import { CategoriesContainer } from 'containers'
import React from 'react'
import { useSelector } from 'react-redux'

export default function index() {
  const { categories } = useSelector(state => state.main);

  return (
    <div className='custom-container mx-auto'>
      <CategoriesContainer title="Mahsulotlar katalogi" categories={categories} starterSlug="category" />
    </div>
  )
}
