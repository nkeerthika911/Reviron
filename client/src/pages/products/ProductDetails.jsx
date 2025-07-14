import React from 'react'
import { Navbar } from '../Navbar'
import { ProdDetails } from './components/ProdDetailsCard'

export const ProductDetails = () => {
  return (
    <div>
      <div className="pt-3">
        <Navbar />
      </div>
      <div>
        <ProdDetails/>
      </div>

    </div>
  )
}
