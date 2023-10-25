import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToMiddle = ({ children }) => {
  const { pathname } = useLocation();

   const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (hasRendered) {
      window.scrollTo(2, 4);
    } else {
      // This is the initial render, so we don't scroll to the top.
      setHasRendered(true);
    }
  }, [pathname, hasRendered]);
  return children ;
};

export default ScrollToMiddle;