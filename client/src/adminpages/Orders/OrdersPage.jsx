import React from 'react'
import {Orders} from './Orders.jsx'
import { AdminNavbar } from '../AdminNavbar.jsx'


export const OrdersPage = () => {
  return (
    <div className="relative">
      {/* Fixed Navbar at the top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AdminNavbar/>
      </div>
      
      {/* Content below navbar with padding-top to account for navbar height */}
      <div className="pt-16 pl-[70px]"> {/* Adjust pt-16 based on your navbar height */}
        <Orders />
      </div>
      
    </div>
  )
}