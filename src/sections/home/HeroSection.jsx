import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import Container from '../../components/common/Container';
import heroImageOne from '../../assets/images/home/iris-hero-ss26-01.png';
import heroImageTwo from '../../assets/images/home/iris-hero-ss26-02.png';
import heroImageThree from '../../assets/images/home/iris-hero-ss26-03.png';

const campaignImages = [heroImageOne, heroImageTwo, heroImageThree];

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const interval = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % campaignImages.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  const currentImage = campaignImages[activeImage];

  return (
    <section className="hero-section" style={{ '--hero-image': `url("${currentImage}")` }}>
      {campaignImages.map((image, index) => (
        <img
          className={`hero-section__media${index === activeImage ? ' hero-section__media--active' : ''}`}
          src={image}
          alt={index === activeImage ? 'IRIS SS26 Heritage Denim Edition wide-leg jeans' : ''}
          aria-hidden={index !== activeImage}
          key={image}
        />
      ))}
      <div className="hero-section__overlay" />

      <Container>
        <div className="hero-section__content">
          <p className="eyebrow">SS26 - Heritage Denim Edition</p>

          <h1>
            <span className="hero-section__title-emphasis">Rooted in culture.</span>
            <span className="hero-section__title-secondary">Made for you.</span>
          </h1>

          <Button to="/collections">Explore the Collection</Button>
        </div>
      </Container>
    </section>
  );
}
