import { useEffect, useState } from 'react';

export function useScrollDirection(offset = 48) {
  const [state, setState] = useState({ direction: 'up', isPastTop: false });
  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => { const currentY = window.scrollY; setState({ direction: currentY > previousY ? 'down' : 'up', isPastTop: currentY > offset }); previousY = currentY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return state;
}
