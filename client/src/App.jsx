import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Products } from './pages/products/Products'
import { ProductDetails } from './pages/products/ProductDetails'

import Contactus from './pages/contactus/Contact'
import { Profile } from './pages/profile/Profile'
import { Sell } from './pages/sell/Sell'
import { Community } from './pages/community/Community'
import { Cart } from './pages/cart/Cart'
import { AdminOrders } from './pages/products/AdminOrders'
import { WorkerPage } from './pages/products/WorkerPage'
import { CartProvider } from "./context/CartContext";
import { BuyPage } from './pages/products/BuyPage';
import { Payment } from './pages/products/components/payment';
import { ItemView } from './pages/products/ItemView'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/product/:productId" element={<ProductDetails/>}></Route>
            <Route path="/admin/product/add" element={<addProduct/>}></Route>

            <Route path="/contactus" element={<Contactus />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/sell" element={<Sell/>}></Route>
            <Route path="/community" element={<Community/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/admin/order" element={<AdminOrders/>}></Route>
            <Route path="/WorkerPage" element={<WorkerPage/>}></Route>
            <Route path="/buypage" element={<BuyPage/>}></Route>
            <Route path="/payment" element={<Payment/>}></Route>
            <Route path="/ItemView" element={<ItemView/>}></Route>
            <Route path="/*" element={<Products/>}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
