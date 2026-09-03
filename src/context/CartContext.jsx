import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (product, quantity = 1) => setItems((current) => {
    const existing = current.find((item) => item.id === product.id);
    return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }];
  });
  const removeItem = (productId) => setItems((items) => items.filter((item) => item.id !== productId));
  const updateQuantity = (productId, quantity) => setItems((items) => quantity < 1 ? items.filter((item) => item.id !== productId) : items.map((item) => item.id === productId ? { ...item, quantity } : item));
  const clearCart = () => setItems([]);
  const value = useMemo(() => ({ items, addItem, removeItem, updateQuantity, clearCart, itemCount: items.reduce((total, item) => total + item.quantity, 0), total: items.reduce((total, item) => total + item.price * item.quantity, 0) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
