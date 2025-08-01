import React from 'react'
import { Navbar } from '../Navbar'
import  OrderCard  from './components/orderCard'
export const AdminOrders = () => {
  return (
    <>
    
        <div className="h-screen w-screen bg-gray-50 flex flex-col">
          <Navbar />
          
          <div className="flex p-4 overflow-hidden">
            <OrderCard/>
        </div>
        </div>
    </>
  )
}
