import React from 'react'
import { WorkerCard } from '../../pages/products/components/WorkerCard'
import { AdminNavbar } from '../AdminNavbar'

export const WorkerPage = () => {
  return (
    <div>
      {/* Navbar at the top with padding */}
      <div>
        <AdminNavbar/>
      </div>
      <div className="pt-7 pl-[70px]">
        <WorkerCard />
      </div>
    </div>
  )
}