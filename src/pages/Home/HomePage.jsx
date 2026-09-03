import { useEffect } from 'react';
import HeroSection from '../../sections/home/HeroSection';
import StoryPreview from '../../sections/home/StoryPreview';
import FeaturedCollection from '../../sections/home/FeaturedCollection';
import BrandValues from '../../sections/home/BrandValues';
import CollectionPreview from '../../sections/home/CollectionPreview';

export default function HomePage() {
  useEffect(() => {
    const sections = [...document.querySelectorAll('.home-page [data-reveal]')];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    sections[0]?.classList.add('is-visible');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10%', threshold: 0.12 });

    sections.slice(1).forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <div className="home-page"><div className="home-page__hero" data-reveal><HeroSection /></div><div className="home-page__benefits" data-reveal><BrandValues /></div><div className="home-page__story" data-reveal><StoryPreview /></div><div className="home-page__featured" data-reveal><FeaturedCollection /></div><div className="home-page__collections" data-reveal><CollectionPreview /></div></div>;
}
