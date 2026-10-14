import Container from '../../components/common/Container';
import CollectionGrid from '../../components/collection/CollectionGrid';
import { collections } from '../../data/collections';

export default function CollectionPreview() {
  const featuredCollections = collections.filter((collection) => collection.featured);

  return <section className="home-collection-preview"><Container><p className="eyebrow home-collection-preview__label">Explore the Collection</p><CollectionGrid collections={featuredCollections} /></Container></section>;
}
