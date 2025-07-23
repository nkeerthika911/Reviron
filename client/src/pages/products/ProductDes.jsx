import React from 'react'
import { Navbar } from '../Navbar'
import { ProductDescription } from './components/ProductDescription'

export const ProductDes = () => {
  return (
    <div>
      {/* Navbar at the top with padding */}
      <div className="pt-3">
        <Navbar />
      </div>

      {/* Product Description with custom left padding */}
      <div className="pt-7 pl-[70px]">
        <ProductDescription />
      </div>
    </div>
  )
}
