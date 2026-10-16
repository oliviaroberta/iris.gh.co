import { Link } from 'react-router-dom';
import { Camera, Music2 } from 'lucide-react';
import Container from '../common/Container';
import { primaryNavigation } from '../../data/navigation';
import { brand } from '../../data/brand';
import logo from '../../assets/images/branding/iris-logo-primary.png';

const Facebook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1h-3c-4 0-6 2-6 6v2H6v4h3v9z" /></svg>;
const socialIcons = { Instagram: Camera, Facebook, TikTok: Music2 };
export default function ShopFooter() {
  return <footer className="shop-footer"><Container className="shop-footer__top"><Link to="/" aria-label="IRIS home"><img className="shop-footer__logo" src={logo} alt="IRIS rooted in culture" /></Link><nav aria-label="Footer navigation">{primaryNavigation.filter((link) => link.to !== '/size-guide').map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}</nav><div className="shop-footer__social">{brand.socialLinks.map((social) => { const Icon = socialIcons[social.label]; return <a key={social.label} href={social.href} aria-label={social.label}><Icon size={18} /></a>; })}</div></Container><div className="shop-footer__bottom"><Container><span>&copy; 2026 {brand.domain}. All rights reserved.</span><nav aria-label="Legal"><Link to="/privacy-policy">Privacy Policy</Link><a href="#">Terms &amp; Conditions</a></nav></Container></div></footer>;
}

