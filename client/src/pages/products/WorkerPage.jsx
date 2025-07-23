import React from 'react'
import { Navbar } from '../Navbar'
import { WorkerCard } from './components/WorkerCard'

export const WorkerPage = () => {
  return (
    <div>
      {/* Navbar at the top with padding */}
      <div>
        <Navbar />
      </div>
      <div className="pt-7 pl-[70px]">
        <WorkerCard />
      </div>
    </div>
  )
}