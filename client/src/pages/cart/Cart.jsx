import React from 'react'
import { Navbar } from '../Navbar'
import { CartProduct } from './components/CartProduct'
import { OrderSummary } from './components/OrderSummary'

export const Cart = () => {
    return (
        <>
            <div className="h-screen w-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex p-4 overflow-hidden">
                    <CartProduct />
                    <OrderSummary />
                </div>
            </div>
        </>
    )
}
