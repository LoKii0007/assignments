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
    const handleResize = () => {
      setScreen(getSizes());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
};

export default useWindow;
