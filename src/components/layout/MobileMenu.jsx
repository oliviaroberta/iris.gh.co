import { NavLink } from 'react-router-dom';
export default function MobileMenu({ isOpen, links, onClose }) {
  return <nav className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`} aria-label="Mobile navigation" aria-hidden={!isOpen}><div className="mobile-menu__links">{links.map((link) => <NavLink key={link.to} to={link.to} onClick={onClose}>{link.label}</NavLink>)}</div><div className="mobile-menu__actions"><button type="button">Login</button><button type="button" aria-label="Change currency">Currency: GHS</button></div></nav>;
}
