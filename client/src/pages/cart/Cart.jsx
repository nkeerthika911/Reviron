import React from 'react'
import { Navbar } from '../Navbar'
import { CartProduct } from './components/CartProduct'
import { OrderSummary } from './components/OrderSummary'

export const Cart = () => {
    return (
        <>
            <Navbar/>
            <CartProduct/>
            <OrderSummary/>
        </>
    )
}
