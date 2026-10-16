import irisLogo from '../../assets/images/branding/iris-logo-primary.png';

export default function WaitlistHero() {
  const scrollToForm = () => document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <header className="waitlist-hero">
      <div className="waitlist-hero__copy">
        <a className="waitlist-hero__logo" href="#top" aria-label="IRIS home">
          <img src={irisLogo} alt="IRIS — Rooted in Culture" />
        </a>
        <div className="waitlist-hero__message">
          <span className="waitlist-rule" aria-hidden="true" />
          <h1><span>Your IRIS era</span><em>starts here.</em></h1>
          <div className="waitlist-hero__description">
            <p>Discover IRIS, a women's denim brand that brings African culture into everyday fashion.</p>
            <p>We're creating stylish, comfortable jeans with beautiful African print details. Be among the first to see our debut collection.</p>
          </div>
          <button type="button" onClick={scrollToForm}>Join the waitlist <span aria-hidden="true">↓</span></button>
        </div>
      </div>
    </header>
  );
}
