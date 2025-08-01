import React from 'react'
import { Navbar } from '../Navbar'
import { ViewItem } from './components/ViewItem'

export const ItemView = () => {
  return (
    <div>
      {/* Navbar at the top with padding */}
      <div>
        <Navbar />
      </div>
      <div className="pt-7 pl-[70px]">
        <ViewItem />
      </div>
    </div>
  )
}