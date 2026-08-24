import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
  collections,
  featureNotes,
  highlightCards,
  iconFeatures,
  shopCategories,
} from './content';
import logoFull from './assets/logo-full.jpeg';
import logoMark from './assets/logo-mark.jpeg';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);

  useEffect(() => {
    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      document.head.appendChild(favicon);
    }

    favicon.setAttribute('href', logoMark);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const pastTop = currentScrollY > 40;

      setHeaderCompact(pastTop);

      if (menuOpen) {
        setHeaderHidden(false);
      } else if (!pastTop) {
        setHeaderHidden(false);
      } else {
        setHeaderHidden(scrollingDown);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <TopStrip />
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        headerHidden={headerHidden}
        headerCompact={headerCompact}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/our-story" element={<StoryPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />
        <Route path="/lookbook" element={<LookbookPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="action-icon">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16L21 21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="action-icon">
      <path
        d="M7 7H20L18.5 15H8.5L7 7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 7L6.2 4.5H3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="18.3" r="1.2" fill="currentColor" />
      <circle cx="17" cy="18.3" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TopStrip() {
  return <div className="top-strip">ROOTED IN CULTURE. MADE FOR YOU.</div>;
}

function Header({ menuOpen, setMenuOpen, headerHidden, headerCompact }) {
  const links = [
    ['/', 'Home'],
    ['/shop', 'Shop'],
    ['/our-story', 'Our Story'],
    ['/collections', 'Collections'],
    ['/size-guide', 'Size Guide'],
    ['/lookbook', 'Lookbook'],
    ['/contact', 'Contact'],
  ];
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-header${menuOpen ? ' menu-open' : ''}${headerHidden ? ' hidden' : ''}${headerCompact ? ' compact' : ''}`}
    >
      <div className="brand">
        <img src={logoFull} alt="iris.gh.co logo" className="brand-logo" />
      </div>
      <button
        type="button"
        className={`menu-toggle${menuOpen ? ' open' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        {links.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            onClick={closeMenu}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions" aria-label="Account and shopping actions">
        <button type="button" className="icon-button" aria-label="Search">
          <SearchIcon />
        </button>
        <button type="button" className="icon-button" aria-label="Cart">
          <CartIcon />
        </button>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">NEW COLLECTION</p>
          <h1>ROOTED IN CULTURE. MADE FOR YOU.</h1>
          <p className="lede">
            Premium denim trousers for women, designed with African prints,
            rooted in heritage, made for today.
          </p>
          <div className="button-row">
            <NavLink className="button button-dark" to="/shop">
              Shop Now
            </NavLink>
            <NavLink className="button button-light" to="/collections">
              Discover Collection
            </NavLink>
          </div>
        </div>
        <MediaPlaceholder label="Hero image coming soon" />
      </section>

      <section className="story-grid">
        <MediaPlaceholder label="Brand story image coming soon" />
        <div className="story-copy">
          <p className="eyebrow">OUR STORY</p>
          <h2>MORE THAN DENIM, A CULTURE, A STATEMENT.</h2>
          <p>
            At Iris, we blend timeless denim with the richness of African
            heritage. Every piece is thoughtfully designed to celebrate who we
            are and how we wear our culture confidently and beautifully.
          </p>
          <NavLink className="button button-dark" to="/our-story">
            Learn More About Us
          </NavLink>
        </div>
      </section>

      <section className="collection-spotlight">
        <div className="spotlight-image">
          <MediaPlaceholder label="Collection image coming soon" compact />
        </div>
        <div className="spotlight-copy">
          <p className="eyebrow">OUR FIRST COLLECTION</p>
          <h2>KENTE HEM</h2>
          <p>
            Wide leg denim trousers with authentic Kente print detail. A perfect
            blend of modern cut and cultural pride.
          </p>
          <div className="icon-feature-grid">
            {iconFeatures.map((feature) => (
              <div key={feature.title} className="icon-feature">
                <div className="icon-badge">{feature.icon}</div>
                <span>{feature.title}</span>
              </div>
            ))}
          </div>
          <NavLink className="button button-dark" to="/collections">
            Shop Kente Hem
          </NavLink>
        </div>
      </section>

      <section className="feature-strip">
        {featureNotes.map((item) => (
          <article key={item.title} className="feature-card">
            <div className="feature-icon">{item.icon}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="explore-section">
        <p className="eyebrow centered">EXPLORE THE COLLECTION</p>
        <div className="card-grid">
          {highlightCards.map((card) => (
            <NavLink key={card.title} to={card.link} className="collection-card">
              <div className={`card-visual ${card.tone}`}>
                <span>{card.title}</span>
              </div>
              <small>{card.cta}</small>
            </NavLink>
          ))}
        </div>
      </section>
    </>
  );
}

function ShopPage() {
  return (
    <PageIntro
      eyebrow="SHOP"
      title="A curated denim wardrobe."
      text="Browse every style, from statement hems to clean everyday cuts."
    >
      <div className="listing-grid">
        {shopCategories.map((item) => (
          <article key={item.name} className="product-tile">
            <div className="product-art media-placeholder media-placeholder-small">
              <span>Product image coming soon</span>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{item.price}</span>
          </article>
        ))}
      </div>
    </PageIntro>
  );
}

function StoryPage() {
  return (
    <PageIntro
      eyebrow="OUR STORY"
      title="Denim shaped by heritage."
      text="Iris started with a simple idea: everyday pieces should still carry identity, memory, and pride."
    >
      <div className="split-content">
        <MediaPlaceholder label="Story image coming soon" compact />
        <div className="story-columns">
          <p>
            We combine premium denim construction with textiles inspired by
            African craftsmanship. The result is clothing that feels current
            without disconnecting from where it comes from.
          </p>
          <p>
            Each collection is intentionally small, wearable, and built around
            women who want comfort, confidence, and cultural character in one
            garment.
          </p>
        </div>
      </div>
    </PageIntro>
  );
}

function CollectionsPage() {
  return (
    <PageIntro
      eyebrow="COLLECTIONS"
      title="Signature drops and seasonal edits."
      text="Explore the lines that define Iris, starting with the bestselling Kente Hem collection."
    >
      <div className="listing-grid">
        {collections.map((item) => (
          <article key={item.name} className="editorial-card">
            <div className="editorial-art media-placeholder media-placeholder-small">
              <span>Collection image coming soon</span>
            </div>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageIntro>
  );
}

function SizeGuidePage() {
  return (
    <PageIntro
      eyebrow="SIZE GUIDE"
      title="Find your best fit."
      text="Use these simplified measurements as a starting point for wide-leg and structured denim styles."
    >
      <div className="size-table-wrap">
        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Waist</th>
              <th>Hip</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['UK 8', '26"', '37"', '42"'],
              ['UK 10', '28"', '39"', '42"'],
              ['UK 12', '30"', '41"', '43"'],
              ['UK 14', '32"', '43"', '43"'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageIntro>
  );
}

function LookbookPage() {
  return (
    <PageIntro
      eyebrow="LOOKBOOK"
      title="Styling references for every day."
      text="A quick visual guide to how Iris denim can move from casual daytime dressing to sharper evening looks."
    >
      <div className="masonry-grid">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={item} className="masonry-card media-placeholder">
            <span>Look {index + 1}</span>
          </div>
        ))}
      </div>
    </PageIntro>
  );
}

function ContactPage() {
  return (
    <PageIntro
      eyebrow="CONTACT"
      title="We’d like to hear from you."
      text="Questions about sizing, orders, or wholesale? Send a message and we’ll respond with the right details."
    >
      <div className="contact-layout">
        <form className="contact-form">
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Your email" />
          <textarea rows="6" placeholder="Your message" />
          <button type="button" className="button button-dark">
            Send Message
          </button>
        </form>
        <div className="contact-card">
          <h3>Studio</h3>
          <p>Accra, Ghana</p>
          <h3>Email</h3>
          <p>hello@iris.gh.co</p>
          <h3>Hours</h3>
          <p>Monday to Friday, 9am to 5pm</p>
        </div>
      </div>
    </PageIntro>
  );
}

function PageIntro({ eyebrow, title, text, children }) {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede narrow">{text}</p>
      </section>
      <section>{children}</section>
    </main>
  );
}

function MediaPlaceholder({ label, compact = false }) {
  return (
    <div className={`media-placeholder${compact ? ' compact' : ''}`}>
      <span className="panel-label">{label}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <img src={logoFull} alt="iris.gh.co logo" className="brand-logo footer-logo" />
          </div>
          <p>
            Denim that embraces culture. Designed for women who lead, inspired
            by where we come from.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <NavLink to="/shop">All Products</NavLink>
          <NavLink to="/collections">Kente Hem</NavLink>
          <NavLink to="/shop">Wide Leg</NavLink>
          <NavLink to="/shop">Light Wash</NavLink>
        </div>
        <div>
          <h4>Customer Care</h4>
          <NavLink to="/size-guide">Size Guide</NavLink>
          <NavLink to="/contact">Shipping & Delivery</NavLink>
          <NavLink to="/contact">Returns & Exchanges</NavLink>
          <NavLink to="/contact">FAQs</NavLink>
        </div>
        <div>
          <h4>About</h4>
          <NavLink to="/our-story">Our Story</NavLink>
          <NavLink to="/our-story">Our Promise</NavLink>
          <NavLink to="/our-story">Sustainability</NavLink>
          <NavLink to="/lookbook">Lookbook</NavLink>
        </div>
        <div>
          <h4>Stay Connected</h4>
          <p>Be the first to know about new collections and exclusive offers.</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="button">→</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 iris.gh.co. All Rights Reserved.</span>
        <div>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}

export default App;
