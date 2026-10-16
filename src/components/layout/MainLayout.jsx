import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import logoMark from '../../assets/images/branding/iris-logo-primary.png';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import ShopFooter from './ShopFooter';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const isShopPage = pathname === '/shop';

  useEffect(() => { let icon = document.querySelector("link[rel='icon']"); if (!icon) { icon = document.createElement('link'); icon.rel = 'icon'; document.head.appendChild(icon); } icon.href = logoMark; }, []);
  return <div className={`site-shell${isShopPage ? ' site-shell--shop' : ''}`}><AnnouncementBar /><div className="site-content"><Header overlay={isHomePage} /><main><Outlet /></main></div>{isShopPage ? <ShopFooter /> : <Footer />}</div>;
}

