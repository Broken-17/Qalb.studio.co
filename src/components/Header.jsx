import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { site } from '../config/site';
import { useCart } from '../context/CartContext';
import { useI18n } from '../i18n';
import { hasLookbook } from '../lib/lookbook';

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const [stuck, setStuck] = useState(false);
  const input = useRef(null);
  const { count, openDrawer } = useCart();
  const nav = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/shop', label: t('nav.shop') },
    ...(hasLookbook ? [{ to: '/lookbook', label: t('nav.lookbook') }] : []),
    { to: '/about', label: t('nav.story') },
    { to: '/size-guide', label: t('nav.sizes') },
    { to: '/contact', label: t('nav.contact') },
  ];

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
        <Logo />

        <nav className={`nav${open ? ' open' : ''}`} aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" data-tip={t('tip.search')} aria-label={t('tip.search')} onClick={() => setSearching((v) => !v)}>
            <Search size={21} />
          </button>
          <LangSwitch />
          <button className="icon-btn bag" data-tip={t('tip.bag')} aria-label={`${t('tip.bag')} (${count})`} onClick={openDrawer}>
            <ShoppingBag size={21} />
            {count > 0 && <span className="badge" key={count}>{count}</span>}
          </button>
          <button className="icon-btn burger" data-tip={t('tip.menu')} aria-label={t('tip.menu')} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searching && (
        <form className="search-bar" onSubmit={submit} role="search">
          <div className="container search-in">
            <Search size={18} />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search.placeholder')} aria-label={t('tip.search')} />
            <button type="button" className="icon-btn" data-tip={t('tip.close')} aria-label={t('tip.close')} onClick={() => setSearching(false)}>
              <X size={18} />
            </button>
          </div>
        </form>
      )}
    </header>
  );
}
