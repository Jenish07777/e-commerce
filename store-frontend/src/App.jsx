
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer'
import Navbar from './components/Navbar'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Home from './pages/Home'

function App() {
  
  return (
    <>
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="products/:id" element={<ProductDetails/>}/>
      <Route path="products" element={<Products/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="orders" element={<Orders/>}/>

    </Routes>
    <Footer/>
    
    </>
  )
}

export default App
