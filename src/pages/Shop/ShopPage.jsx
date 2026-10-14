import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, SlidersHorizontal, Send, LockKeyhole, Truck } from 'lucide-react';
import Container from '../../components/common/Container';
import { products } from '../../data/products';
import { collections } from '../../data/collections';
import { useCart } from '../../hooks/useCart';
import './shop.css';

const promises = [
  [Send, 'Premium Quality', 'Carefully selected fabrics for lasting comfort.'],
  [LockKeyhole, 'Secure Payments', 'Safe and reliable checkout.'],
  [Truck, 'Fast Delivery', 'Swift delivery across Ghana and beyond.'],
  [Heart, 'Made with Heritage', 'African prints that tell our stories.'],
];

export default function ShopPage() {
  const { addItem } = useCart();
  const [tab, setTab] = useState('All Pieces');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');
  const [collection, setCollection] = useState('');
  const [sort, setSort] = useState('featured');
  const [saved, setSaved] = useState([]);
  const [message, setMessage] = useState('');
  const visible = products.filter((product) => (!size || product.sizes.includes(size)) && (!colour || product.colors.includes(colour)) && (!collection || product.collection === collection) && (tab !== 'New In' || product.isNew) && (tab !== 'Jeans' || product.category === 'Jeans'));
  if (sort === 'price-low') visible.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') visible.sort((a, b) => b.price - a.price);
  if (sort === 'name') visible.sort((a, b) => a.name.localeCompare(b.name));
  const reset = () => { setSize(''); setColour(''); setCollection(''); setTab('All Pieces'); };
  const collectionOptions = collections.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>);
  return <div className="shop-page">
    <Container><section className="shop-intro" aria-labelledby="shop-title"><div><h1 id="shop-title">Denim, reimagined through culture.</h1><p className="shop-description">Discover every IRIS piece, from signature denim to our latest collections.<br />Contemporary silhouettes. Thoughtful craftsmanship. Unmistakably IRIS.</p></div><aside>More<br />than<br />denim<span /></aside></section></Container>
    <div className="shop-tabs"><Container><div className="shop-tabs__inner" aria-label="Product categories">{['All Pieces', 'New In', 'Jeans'].map((label) => <button key={label} type="button" aria-pressed={tab === label} className={tab === label ? 'is-active' : ''} onClick={() => setTab(label)}>{label}</button>)}<select aria-label="Browse collections" value={collection} onChange={(event) => setCollection(event.target.value)}><option value="">Collections</option>{collectionOptions}</select></div></Container></div>
    <Container><section className="shop-catalog" aria-label="Shop products"><div className="shop-toolbar"><button type="button" className="shop-filter-toggle" aria-expanded={filtersOpen} aria-controls="shop-filters" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={19} />Filter</button><div id="shop-filters" className="shop-filters" hidden={!filtersOpen}><select aria-label="Filter by size" value={size} onChange={(event) => setSize(event.target.value)}><option value="">Size</option>{['XS', 'S', 'M', 'L', 'XL'].map((value) => <option key={value}>{value}</option>)}</select><select aria-label="Filter by colour" value={colour} onChange={(event) => setColour(event.target.value)}><option value="">Colour</option><option>Light Blue</option><option>Indigo</option><option>Black</option></select><select aria-label="Filter by collection" value={collection} onChange={(event) => setCollection(event.target.value)}><option value="">Collection</option>{collectionOptions}</select></div><span className="shop-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'product' : 'products'}</span><select className="shop-sort" aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Sort by</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A-Z</option></select></div>
    {(size || colour || collection) && <div className="shop-active-filters"><span>{[size, colour, collections.find((item) => item.slug === collection)?.name].filter(Boolean).join(' / ')}</span><button type="button" onClick={reset}>Clear filters</button></div>}
    <div className="shop-products">{visible.map((product) => <article className="shop-product" key={product.id}><div className="shop-product__photo"><Link to={`/shop/${product.slug}`}><img src={product.images[0]} alt={product.name} /></Link>{product.isNew && <span className="shop-product__badge">New</span>}<button type="button" className="shop-product__heart" aria-label={`${saved.includes(product.id) ? 'Unsave' : 'Save'} ${product.name}`} aria-pressed={saved.includes(product.id)} onClick={() => setSaved((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}><Heart size={22} fill={saved.includes(product.id) ? 'currentColor' : 'none'} /></button></div><h2><Link to={`/shop/${product.slug}`}>{product.name}</Link></h2><div className="shop-product__details"><div><p>SS26 &mdash; Heritage Denim Edition</p><strong>GHC {product.price}</strong></div><button type="button" className="shop-add" onClick={() => { addItem(product); setMessage(`${product.name} added to your bag.`); }}>Add to bag</button></div></article>)}</div>
    {!visible.length && <div className="shop-empty"><p>No pieces match these filters.</p><button type="button" onClick={reset}>View all pieces</button></div>}<p className="shop-status" role="status">{message}</p></section></Container>
    <section className="shop-promises" aria-label="The IRIS promise"><Container>{promises.map(([Icon, title, description]) => <article key={title}><Icon size={30} strokeWidth={1.4} /><h2>{title}</h2><p>{description}</p></article>)}</Container></section>
  </div>;
}
