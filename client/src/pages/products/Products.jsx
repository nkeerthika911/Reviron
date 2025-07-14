import React from 'react'
import { Navbar } from '../Navbar'
import { ProductCard } from './components/ProductCard'
import { Filters } from './components/Filters' 

export const Products = () => {
  return (
    <>
      <Navbar/>
      <ProductCard/>
      <Filters/>
    </>
  )
}
