import CollectionGrid from '../../components/collection/CollectionGrid';
import Container from '../../components/common/Container';
import { collections } from '../../data/collections';
export default function CollectionPreview() { return <section className="home-collection-preview"><Container><p className="eyebrow home-collection-preview__label">Explore the Collection</p><CollectionGrid collections={collections} /></Container></section>; }
