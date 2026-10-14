import { products } from '../../data/products';
import agyeiwaaPreview from '../../assets/images/waitlist/IMG_4525-Edit.jpg';
import ohemaaPreview from '../../assets/images/waitlist/IMG_4395-Edit.jpg';

const previewImages = { ohemaa: ohemaaPreview, agyeiwaa: agyeiwaaPreview };

export default function WaitlistPreview() {
  const featured = ['ohemaa', 'agyeiwaa'].map((id) => products.find((product) => product.id === id)).filter(Boolean);

  return (
    <section className="waitlist-preview" aria-labelledby="preview-title">
      <div className="waitlist-section-heading">
        <p className="waitlist-kicker">SS26 — Heritage Denim Edition</p>
        <h2 id="preview-title">A first look at IRIS.</h2>
        <p>Two signature designs. One story.<br />Contemporary denim with a deeper meaning.</p>
      </div>
      <div className="waitlist-preview__grid">
        {featured.map((product) => (
          <article key={product.id}>
            <div className="waitlist-preview__image waitlist-preview__image--full"><img src={previewImages[product.id]} alt={`${product.designName} — ${product.subtitle}`} /></div>
            <h3>{product.designName}</h3>
            <p>{product.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
