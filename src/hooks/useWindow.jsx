import { useEffect, useState } from "react";

const breakpoints = {
  small: 590,
  mobile: 768,
  tablet: 1024,
  largeDesktop: 1440,
};

const useWindow = ({ ref } = {}) => {
  const getSizes = () => {
    if (typeof window === "undefined") {
      return { isMobile: false, isTablet: false, isDesktop: true };
    }

    const width = ref?.current ? ref.current.offsetWidth : window.innerWidth;

    return {
      isSmall: width < breakpoints.small,
      isMobile: width >= breakpoints.small && width < breakpoints.mobile,
      isTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
      isDesktop: width >= breakpoints.tablet,
      isLargeDesktop: width >= breakpoints.largeDesktop,
    };
  };

  const [screen, setScreen] = useState(getSizes());

  useEffect(() => {
    const update = () => setScreen(getSizes());

    /* ✅ ADDED: ResizeObserver for ref-based resize detection */
    if (ref?.current) {
      const observer = new ResizeObserver(() => {
        update(); // 🔥 triggers when ref size changes instead of window only
      });

      observer.observe(ref.current);

      return () => observer.disconnect(); // ✅ ADDED: cleanup for observer
    }

    /* ✅ CHANGED: window resize only used when no ref is passed */
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]); // ✅ CHANGED: ref added to dependency array

  return screen;
};

export default useWindow;
