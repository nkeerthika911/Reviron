import React from 'react'
import { Navbar } from '../Navbar'
import { EventForm } from './components/EventForm'
import { EventCard } from './components/EventCard'

export const Community = () => {
    return (
        <>  
            <Navbar/>
            <EventCard/>
            <EventForm/>
        </>
    )
}
