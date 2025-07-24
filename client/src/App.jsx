import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Profile } from './profile/Profile'
import { Products } from './pages/products/Products'
import { Sell } from './pages/sell/Sell'
import { Community } from './pages/community/Community'
import { Cart } from './pages/cart/Cart'
import { ProductDetails } from './pages/products/ProductDetails'
import { AdminOrders } from './pages/products/AdminOrders'
import { ProductDes } from './pages/products/ProductDes'
import { WorkerPage } from './pages/products/WorkerPage'
import { CartProvider } from "./context/CartContext";
import { BuyPage } from './pages/products/BuyPage';
import { Payment } from './pages/products/components/payment';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/products/details" element={<ProductDetails/>}></Route>
            <Route path="/sell" element={<Sell/>}></Route>
            <Route path="/community" element={<Community/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/admin/order" element={<AdminOrders/>}></Route>
            <Route path="/productDes" element={<ProductDes/>}></Route>
            <Route path="/WorkerPage" element={<WorkerPage/>}></Route>
            <Route path="/buypage" element={<BuyPage/>}></Route>
            <Route path="/payment" element={<Payment/>}></Route>
            <Route path="/*" element={<Products/>}></Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
