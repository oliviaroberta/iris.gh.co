import { Link } from 'react-router-dom';
export default function CollectionCard({ collection }) {
  return <article className="collection-card"><Link to={`/collections/${collection.slug}`}><img className="collection-card__image" src={collection.image} alt={collection.name} /><div className="collection-card__overlay"><p className="eyebrow">{collection.name}</p></div></Link></article>;
}
