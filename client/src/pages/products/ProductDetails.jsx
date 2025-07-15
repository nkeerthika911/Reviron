import React from 'react'
import { Navbar } from '../Navbar'
import { ProductDetailsCard } from './components/ProductDetailsCard'

export const ProductDetails = () => {
  return (
    <div>
      <div className="pt-3">
        <Navbar />
      </div>
      <div className="pt-7 pl-70">
        <ProductDetailsCard/>
      </div>

    </div>
  )
}
