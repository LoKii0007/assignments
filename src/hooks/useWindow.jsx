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
      isMobile: width >= breakpoints.small,
      isTablet: width >= breakpoints.mobile,
      isDesktop: width >= breakpoints.tablet,
      isLargeDesktop: width >= breakpoints.largeDesktop,
    };
  };

  const [screen, setScreen] = useState(getSizes());

  useEffect(() => {
    const update = () => setScreen(getSizes());

    if (ref?.current) {
      const observer = new ResizeObserver(() => {
        update();
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  return screen;
};

export default useWindow;
