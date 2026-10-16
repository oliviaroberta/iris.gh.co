import { useState } from 'react';
import WaitlistHero from '../../components/waitlist/WaitlistHero';
import WaitlistPreview from '../../components/waitlist/WaitlistPreview';
import WaitlistForm from '../../components/waitlist/WaitlistForm';
import WaitlistSuccess from '../../components/waitlist/WaitlistSuccess';
import heroSlideOne from '../../assets/images/waitlist/IRIS_Hero_Slide_1_IMG_4437_1920x1080.jpg';
import heroSlideTwo from '../../assets/images/waitlist/IRIS_Hero_Slide_2_IMG_4400_1920x1080.jpg';
import heroSlideThree from '../../assets/images/waitlist/IRIS_Hero_Slide_3_IMG_4610_1920x1080.jpg';
import mobileSlideOne from '../../assets/images/waitlist/IRIS_Hero_Mobile_Slide_2.jpeg';
import mobileSlideTwo from '../../assets/images/waitlist/IRIS_Hero_Mobile_Slide_1.jpeg';
import mobileSlideThree from '../../assets/images/waitlist/IRIS_Hero_Mobile_Slide_3.jpeg';
import irisLogo from '../../assets/images/branding/iris-logo-primary.png';
import './WaitlistPage.css';

const heroSlides = [
  { desktop: heroSlideOne, mobile: mobileSlideOne },
  { desktop: heroSlideTwo, mobile: mobileSlideTwo },
  { desktop: heroSlideThree, mobile: mobileSlideThree },
];

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="waitlist-page" id="top">
      <div className="waitlist-background" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div key={slide.desktop} className={`waitlist-background__slide waitlist-background__slide--${index + 1}`}>
            <picture>
              <source media="(max-width: 530px)" srcSet={slide.mobile} />
              <img src={slide.desktop} alt="" className="waitlist-background__image" />
            </picture>
          </div>
        ))}
      </div>
      <WaitlistHero />
      <main>
        <WaitlistPreview />
        <section className="waitlist-questionnaire" id="join" aria-label="IRIS waitlist questionnaire">
          {submitted ? <WaitlistSuccess onBackToTop={backToTop} /> : <WaitlistForm onSuccess={() => setSubmitted(true)} />}
        </section>
      </main>
      <footer className="waitlist-footer">
        <a className="waitlist-footer__logo" href="#top" aria-label="IRIS — back to top"><img src={irisLogo} alt="IRIS" /><span>Rooted in Culture</span></a>
        <div className="waitlist-footer__contact">
          <strong>Contact &amp; enquiries</strong>
          <a href="mailto:weariris@outlook.com">weariris@outlook.com</a>
          <a href="tel:+233550907806">0550907806</a>
          <small>Please allow at least 24 hours for a response.</small>
        </div>
        <p>© 2026 IRIS. All rights reserved.</p>
      </footer>
    </div>
  );
}
