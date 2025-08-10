import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Forces the window to scroll to top on initial mount and whenever the route changes.
export default function ScrollToTop() {
  const location = useLocation();

  // Ensure browser doesn't restore previous scroll positions on reload/navigation
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Scroll to top on route changes and initial mount
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return null;
}
