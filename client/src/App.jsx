import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Products } from './pages/products/Products'
import { ProductDetails } from './pages/products/ProductDetails'
import { AdminAddProduct } from './adminpages/products/AdminAddProducts'
import { Cart } from './pages/cart/Cart'

import Contactus from './pages/contactus/Contact'
import { Profile } from './pages/profile/Profile'
import { Sell } from './pages/sell/Sell'
import { Community } from './pages/community/Community'
import { AdminOrders } from './pages/products/AdminOrders'
import { WorkerPage } from './adminpages/employee/WorkerPage'
import { BuyPage } from './pages/products/BuyPage';
import { Payment } from './pages/products/components/payment';
import { ItemView } from './pages/products/ItemView'
import { Tester } from './pages/tester/Tester'
import { Seller } from './pages/seller/Seller'
import { AdminRequests } from './adminpages/products/AdminRequests'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:productId" element={<ProductDetails/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/buy" element={<BuyPage/>}></Route>
          <Route path="/contactus" element={<Contactus />}></Route>


          <Route path="/admin/product/add" element={<AdminAddProduct/>}></Route>
          <Route path="/admin/order" element={<AdminOrders/>}></Route>
          <Route path="/admin/employee" element={<WorkerPage/>}></Route>
          <Route path="/admin/itemview" element={<ItemView/>}></Route>


          <Route path="/tester" element={<Tester/>}></Route>
          <Route path="/seller" element={<Seller/>}></Route>
          <Route path="/admin" element={<AdminRequests/>}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/sell" element={<Sell/>}></Route>
          <Route path="/community" element={<Community/>}></Route>
          <Route path="/payment" element={<Payment/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
