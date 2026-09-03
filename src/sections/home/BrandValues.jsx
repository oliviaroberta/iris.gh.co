import Container from '../../components/common/Container';
import { Award, Hand, Heart, ShieldCheck } from 'lucide-react';

const values = [
  { icon: Award, title: 'Premium Quality', text: 'Carefully selected fabrics for lasting comfort.' },
  { icon: Heart, title: 'Made With Heritage', text: 'African prints that tell our stories.' },
  { icon: Hand, title: 'Made For You', text: 'Inclusive sizing for every body and every style.' },
  { icon: ShieldCheck, title: 'Secure & Easy', text: 'Safe payments and fast delivery.' },
];

export default function BrandValues() {
  return <section className="brand-values" aria-label="The IRIS promise"><Container className="brand-values__container"><div className="brand-values__track">{values.map(({ icon: Icon, title, text }) => <article key={title}><span className="brand-values__icon"><Icon aria-hidden="true" /></span><div className="brand-values__content"><h2>{title}</h2><p>{text}</p></div></article>)}{values.map(({ icon: Icon, title, text }) => <article aria-hidden="true" key={`${title}-duplicate`}><span className="brand-values__icon"><Icon aria-hidden="true" /></span><div className="brand-values__content"><h2>{title}</h2><p>{text}</p></div></article>)}</div></Container></section>;
}
