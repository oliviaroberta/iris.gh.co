import { products } from '../../data/products';
import agyeiwaaPreview from '../../assets/images/waitlist/IMG_4525-Edit.jpg';
import ohemaaPreview from '../../assets/images/waitlist/IMG_4395-Edit.jpg';

const previewImages = { ohemaa: ohemaaPreview, agyeiwaa: agyeiwaaPreview };
const previewCopy = {
  ohemaa: { name: 'Ohemaa Wide-Leg Jeans', detail: 'Kente Hem' },
  agyeiwaa: { name: 'Agyeiwaa Wide-Leg Jeans', detail: 'African Print Side & Pocket Details' },
};

export default function WaitlistPreview() {
  const featured = ['ohemaa', 'agyeiwaa'].map((id) => products.find((product) => product.id === id)).filter(Boolean);

  return (
    <section className="waitlist-preview" aria-labelledby="preview-title">
      <div className="waitlist-section-heading">
        <p className="waitlist-kicker">Introducing Our First Collection</p>
        <h2 id="preview-title">Heritage Denim Edition</h2>
        <p className="waitlist-season">SS26 Collection</p>
        <p>A first look at our wide-leg jeans, designed with African print details that bring something special to your everyday style.</p>
      </div>
      <div className="waitlist-preview__grid">
        {featured.map((product) => (
          <article key={product.id}>
            <div className="waitlist-preview__image waitlist-preview__image--full"><img src={previewImages[product.id]} alt={`${product.designName} — ${product.subtitle}`} /></div>
            <h3>{previewCopy[product.id].name}</h3>
            <p>{previewCopy[product.id].detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
