import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { ShopProvider, useShop } from './context/ShopContext'
import Header from './Header/Header'
import Home from './Home/Home'
import './Login/Login.css'
import About from './pages/About.tsx'
import Cart from './pages/Cart.tsx'
import Checkout from './pages/Checkout.tsx'
import Contact from './pages/Contact.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import Products from './pages/Products.tsx'

const AppShell = () => {
  const { totalItemsInCart } = useShop();
  return (
    <>
      <Header cartCount={totalItemsInCart} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppShell />
      </ShopProvider>
    </AuthProvider>
  )
}

export default App