import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { DevNotice, Toast, WhatsAppFloat } from './components/Extras';
import CartDrawer from './components/CartDrawer';
import BgFx from './components/BgFx';
import { CartProvider } from './context/CartContext';
import { I18nProvider } from './i18n';
import { useReveal, useScrollTop } from './hooks/hooks';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Terms from './pages/Terms';
import SizeGuide from './pages/SizeGuide';
import Wholesale from './pages/Wholesale';
import Lookbook from './pages/Lookbook';
import { hasLookbook } from './lib/lookbook';
import NotFound from './pages/NotFound';

function Shell() {
  useScrollTop();
  useReveal();
  return (
    <>
      <BgFx />
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/wholesale" element={<Wholesale />} />
          {hasLookbook && <Route path="/lookbook" element={<Lookbook />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
      <Toast />
      <DevNotice />
    </>
  );
}

/* HashRouter keeps every page working on GitHub Pages (refresh, shared links, any sub-path). */
export default function App() {
  return (
    <HashRouter>
      <I18nProvider>
        <CartProvider>
          <Shell />
        </CartProvider>
      </I18nProvider>
    </HashRouter>
  );
}
