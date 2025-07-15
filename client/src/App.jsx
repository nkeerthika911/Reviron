import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Products } from './pages/products/Products'
import { Sell } from './pages/sell/Sell'
import { Community } from './pages/community/Community'
import { Cart } from './pages/cart/Cart'
import { ProductDetails } from './pages/products/ProductDetails'
import { AdminOrders } from './pages/products/AdminOrders'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/details" element={<ProductDetails/>}></Route>
          <Route path="/sell" element={<Sell/>}></Route>
          <Route path="/community" element={<Community/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/admin/order" element={<AdminOrders/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
