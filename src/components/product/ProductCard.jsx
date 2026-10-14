import { Link } from 'react-router-dom';
import ImagePlaceholder from '../common/ImagePlaceholder';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ProductCard({ product }) {
  return <article className="product-card">
    <Link to={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>{product.images[0] ? <img src={product.images[0]} alt={product.name} className="product-card__image" loading="lazy" /> : <ImagePlaceholder label="Product photography coming soon" alt={`${product.name} placeholder`} className="product-card__image" />}</Link>
    <div className="product-card__details">
      {product.category && <p className="eyebrow">{product.category}</p>}
      <h3><Link to={`/shop/${product.slug}`}>{product.name}</Link></h3>
      <p>{formatCurrency(product.price)}</p>
    </div>
  </article>;
}

