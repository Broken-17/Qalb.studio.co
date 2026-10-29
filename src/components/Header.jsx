import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Logo from './Logo';
import { site } from '../config/site';
import { hasHelp } from '../data/help';
import { useCart } from '../context/CartContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
  ...(hasHelp ? [{ to: '/help', label: 'Help' }] : []),
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const [stuck, setStuck] = useState(false);
  const input = useRef(null);
  const { count } = useCart();
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (searching) input.current?.focus();
  }, [searching]);
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearching(false);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    nav(`/shop?q=${encodeURIComponent(q.trim())}`);
    setSearching(false);
    setQ('');
  };

  return (
    <header className={`header${stuck ? ' stuck' : ''}`}>
      {site.announcement && <div className="announce">{site.announcement}</div>}
      <div className="container nav-row">
        <button className="icon-btn burger" title={open ? 'Close menu' : 'Open menu'} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo />
        <nav className={`nav${open ? ' open' : ''}`} aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" title="Search products" aria-label="Search" onClick={() => setSearching((v) => !v)}>
            <Search size={21} />
          </button>
          <Link className="icon-btn bag" to="/cart" title={`Shopping bag (${count} items)`} aria-label={`Bag, ${count} items`}>
            <ShoppingBag size={21} />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
        </div>
      </div>

      {searching && (
        <form className="search-bar" onSubmit={submit} role="search">
          <div className="container search-in">
            <Search size={18} />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tees, hoodies, oversized..." aria-label="Search products" />
            <button type="button" className="icon-btn" aria-label="Close search" onClick={() => setSearching(false)}>
              <X size={18} />
            </button>
          </div>
        </form>
      )}
    </header>
  );
}
