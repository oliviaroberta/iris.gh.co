import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { primaryNavigation } from '../../data/navigation';
import { useCart } from '../../hooks/useCart';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import logoFull from '../../assets/images/branding/iris-logo-primary.png';
import MobileMenu from './MobileMenu';

export default function Header({ overlay = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { direction, isPastTop } = useScrollDirection();
  const { itemCount } = useCart();
  useEffect(() => { if (!menuOpen) return undefined; const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape); }, [menuOpen]);
  useEffect(() => { document.body.classList.toggle('mobile-menu-open', menuOpen); return () => document.body.classList.remove('mobile-menu-open'); }, [menuOpen]);
  const classes = `site-header${overlay ? ' site-header--overlay' : ''}${isPastTop ? ' site-header--compact' : ''}${menuOpen ? ' site-header--menu-open' : ''}${direction === 'down' && isPastTop && !menuOpen ? ' site-header--hidden' : ''}`;
  return <header className={classes}>
    <div className="container site-header__inner">
      <Link className="site-header__brand" to="/" aria-label="IRIS home"><img src={logoFull} alt="IRIS rooted in culture" /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{primaryNavigation.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'}>{link.label}</NavLink>)}</nav>
      <div className="site-header__actions"><button className="icon-button icon-button--search" type="button" aria-label="Search"><Search /></button><button className="icon-button icon-button--wishlist" type="button" aria-label="Wishlist"><Heart /></button><Link className="icon-button cart-button" to="/cart" aria-label={`Cart, ${itemCount} items`}><ShoppingBag /><span>{itemCount}</span></Link><button className="icon-button mobile-menu-button" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button></div>
      <MobileMenu isOpen={menuOpen} links={primaryNavigation} onClose={() => setMenuOpen(false)} />
    </div>
  </header>;
}
