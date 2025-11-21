import { createContext, useState, useContext, useEffect } from "react";
import { THEMES } from "@/utils/constants";

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

  const addToRecentItems = (path) => {
    setRecentlyItems((prev) => {
      const filtered = prev.filter((item) => item !== path);
      return [path, ...filtered].slice(0, 4);
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEMES.DARK) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

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
