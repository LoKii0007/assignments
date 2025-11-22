import { createContext, useState, useContext, useEffect } from "react";
import { THEMES } from "@/utils/constants";
import useWindow from "@/hooks/useWindow";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([
    "/dashboard/projects",
    "/dashboard/online-courses",
  ]);
  const [recentlyItems, setRecentlyItems] = useState([
    "/pages/user-profile",
    "/pages/account",
    "/pages/corporate",
  ]);
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(
    window.innerWidth > 1024 ? true : false
  );
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(
    window.innerWidth > 1024 ? true : false
  );
  const { isSmall: isSmallWindow } = useWindow();

  const addToRecentItems = (path) => {
    setRecentlyItems((prev) => {
      const filtered = prev.filter((item) => item !== path);
      return [path, ...filtered].slice(0, 4);
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen((prev) => {
      if (isSmallWindow) {
        setIsRightSidebarOpen(false);
      }
      return !prev;
    });
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen((prev) => {
      if (isSmallWindow) {
        setIsLeftSidebarOpen(false);
      }
      return !prev;
    });
  };

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEMES.DARK) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 1024) {
        setIsRightSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          favouriteItems,
          setFavouriteItems,
          recentlyItems,
          setRecentlyItems,
          addToRecentItems,
          theme,
          toggleTheme,
          isRightSidebarOpen,
          setIsRightSidebarOpen,
          isLeftSidebarOpen,
          setIsLeftSidebarOpen,
          toggleLeftSidebar,
          toggleRightSidebar,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
