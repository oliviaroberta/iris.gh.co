export const getProductsByCollection = (products, collectionSlug) => products.filter((product) => product.collection === collectionSlug);
export const getProductBySlug = (products, productSlug) => products.find((product) => product.slug === productSlug);
