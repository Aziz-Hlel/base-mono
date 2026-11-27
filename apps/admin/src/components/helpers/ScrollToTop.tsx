import { useWindowScroll } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
  const [, scrollTo] = useWindowScroll();
  const location = useLocation();

  useEffect(() => {
    scrollTo({ top: 0, left: 0 });
  }, [location, scrollTo]);

  return null;
}
