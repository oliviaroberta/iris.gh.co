import kenteHemImage from '../assets/images/collections/kente-hem-wide-leg-jean.png';
import blackPocketImage from '../assets/images/collections/black-pocket-accent-wide-leg-jean.png';
import sideInsertImage from '../assets/images/collections/african-print-side-insert-wide-leg-jean.png';

export const products = [
  // Prices and sizing are temporary placeholders pending client confirmation.
  {
    id: 'ohemaa',
    slug: 'ohemaa-wide-leg-jean',
    designName: 'Ohemaa',
    name: 'Ohemaa Wide Leg Jean',
    subtitle: 'Kente Hem',
    price: 750,
    category: 'Jeans',
    collection: 'heritage-denim-edition',
    images: [kenteHemImage],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Light Blue'],
    description:
      'Light-blue wide-leg denim finished with a vibrant Kente hem. A confident meeting of contemporary silhouette and Ghanaian heritage.',
    story:
      'A celebration of elegance, reimagined. Ohemaa brings together a structured wide-leg silhouette and a distinctive Kente finish at the hem, creating a statement that feels familiar, refined and unexpected.',
    featured: true,
    isNew: true,
    inStock: true,
  },

  {
    id: 'agyeiwaa',
    slug: 'agyeiwaa-wide-leg-jean',
    designName: 'Agyeiwaa',
    name: 'Agyeiwaa Wide Leg Jean',
    subtitle: 'Side & Pocket Accent',
    price: 750,
    category: 'Jeans',
    collection: 'heritage-denim-edition',
    images: [blackPocketImage],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    description:
      'A refined wide-leg jean with a distinctive African textile accent through the side and pocket. Minimal in mood, distinctive in detail.',
    story:
      'Where the detail makes the difference. Agyeiwaa uses African textile detailing through the side and pocket to create a refined visual rhythm without overwhelming the silhouette.',
    featured: true,
    isNew: true,
    inStock: true,
  },

  {
    id: 'ss26-design-3',
    slug: 'african-print-side-insert-wide-leg-jean',
    designName: null,
    name: 'African Print Side-Insert Wide Leg Jean',
    subtitle: 'SS26 Design',
    price: 750,
    category: 'Jeans',
    collection: 'heritage-denim-edition',
    images: [sideInsertImage],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Indigo'],
    description:
      'Wide-leg denim with an integrated African-print side insert.',
    story:
      'An additional SS26 design currently awaiting its final IRIS design name and product story.',
    featured: true,
    isNew: true,
    inStock: true,
  },
];
