import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { DevNotice, Toast, WhatsAppFloat } from './components/Extras';
import { CartProvider } from './context/CartContext';
import { useReveal, useScrollTop } from './hooks/hooks';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import Wholesale from './pages/Wholesale';

function Shell() {
  useScrollTop();
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toast />
      <DevNotice />
    </>
  );
}

/* HashRouter keeps every page working on GitHub Pages (refresh, shared links, any sub-path). */
export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <Shell />
      </CartProvider>
    </HashRouter>
  );
}
