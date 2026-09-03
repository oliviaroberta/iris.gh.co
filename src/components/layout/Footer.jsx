import { Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand } from '../../data/brand';
import { footerNavigation } from '../../data/navigation';
import logoFull from '../../assets/images/branding/iris-logo-primary.png';
import Container from '../common/Container';

export default function Footer() { return <footer className="site-footer"><Container><div className="site-footer__grid"><div><Link to="/" aria-label="IRIS home"><img className="footer-logo" src={logoFull} alt="IRIS rooted in culture" /></Link><p>{brand.description}</p></div>{footerNavigation.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.links.map((link) => <Link key={link.label} to={link.to}>{link.label}</Link>)}</div>)}<div><h2>Stay Connected</h2><p>Be the first to know about new collections and exclusive offers.</p><form className="newsletter-form"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Enter your email" /><button type="submit" aria-label="Subscribe"><Send /></button></form><div className="social-links">{brand.socialLinks.map((social) => <a key={social.label} href={social.href}>{social.label}</a>)}</div></div></div></Container><div className="site-footer__legal"><Container><div className="site-footer__bottom"><span>© 2026 {brand.domain}. All rights reserved.</span><div><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a></div></div></Container></div></footer>; }
