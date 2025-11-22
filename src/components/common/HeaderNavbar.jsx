import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";
import useWindow from "@/hooks/useWindow";

const HeaderNavbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [pathSegments, setPathSegments] = useState([]);
  const {
    favouriteItems,
    setFavouriteItems,
    theme,
    toggleTheme,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useAppContext();
  const mainPageRef = useRef();
  const { isSmall } = useWindow({ ref: mainPageRef });

  useEffect(() => {
    const segments = pathname.split("/");
    setPathSegments(segments.slice(1));
  }, [pathname]);

  const handleFavouriteClick = useCallback(() => {
    if (favouriteItems.includes(pathname)) {
      setFavouriteItems(favouriteItems.filter((item) => item !== pathname));
    } else {
      setFavouriteItems([...favouriteItems, pathname]);
    }
  }, [favouriteItems, pathname]);

  const getFavIcon = useCallback(() => {
    if (favouriteItems.includes(pathname)) {
      return theme === THEMES.LIGHT
        ? "/icons/starGolden.svg"
        : "/icons/darkTheme/starGolden.svg";
    } else {
      return theme === THEMES.LIGHT
        ? "/icons/star.svg"
        : "/icons/darkTheme/star.svg";
    }
  }, [favouriteItems, pathname, theme]);

  return (
    <header
      ref={mainPageRef}
      className=" dark:bg-primary-dark transition-all duration-300 font-[Inter] leading-[20px] tracking-0 border-b border-[#1C1C1C1A] dark:border-tertiary-dark px-4 sm:px-7 sm:py-5 py-4 flex flex-col gap-3 w-full"
    >
      {isSmall && (
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center space-x-2 text-sm breadcrumb-section ">
            <div
              className={`capitalize text-primary-dark dark:text-primary-light ps-1`}
            >
              {pathSegments[pathSegments.length - 1]}
            </div>
          </div>
          <div className="relative flex items-center search-box ml-auto">
            <img
              className="w-4 h-4 absolute left-2"
              src={`/icons/${
                theme === THEMES.LIGHT ? "search.svg" : "/darkTheme/search.svg"
              }`}
              alt=""
            />
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 ps-7 peer bg-[#F3F3F3] dark:bg-tertiary-dark text-[#1C1C1C33] dark:text-primary-light/20 rounded-[8px] text-sm
       w-40 focus:outline-none focus:ring-1 focus:ring-[#1C1C1C] ml-auto"
            />
            <span className="absolute right-2 text-[#1C1C1C33] dark:text-primary-light/20 pointer-events-none">
              ⌘/
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleLeftSidebar}
            className="hover:bg-[#F3F3F3] rounded-[8px] dark:hover:bg-tertiary-dark hover-transition group"
          >
            <img
              className="sm:w-7 sm:h-7 w-6 h-6 group-active:scale-90 transition-all duration-300 ease-in-out"
              src={`/icons/${
                theme === THEMES.LIGHT ? "menu.svg" : "/darkTheme/menu.svg"
              }`}
              alt=""
            />
          </button>
          <button
            onClick={handleFavouriteClick}
            className="hover:bg-[#F3F3F3] rounded-[8px] dark:hover:bg-tertiary-dark hover-transition group"
          >
            <img
              className="sm:w-7 sm:h-7 w-6 h-6 group-active:scale-90 transition-all duration-300 ease-in-out"
              src={getFavIcon()}
              alt=""
            />
          </button>

          {!isSmall && (
            <div className="flex items-center space-x-2 text-sm">
              {pathSegments.map((segment, index) => (
                <div className="space-x-2">
                  <>
                    <span
                      key={index}
                      className={`capitalize ${
                        index === pathSegments.length - 1
                          ? "text-primary-dark dark:text-primary-light"
                          : "text-[#1C1C1C66]  dark:text-secondary-dark"
                      }`}
                    >
                      {segment}
                    </span>
                    {index !== pathSegments.length - 1 && (
                      <span className="text-[#1C1C1C66] dark:text-secondary-dark">
                        /
                      </span>
                    )}
                  </>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-5">
          {!isSmall && (
            <div className="relative flex items-center">
              <img
                className="w-4 h-4 absolute left-2"
                src={`/icons/${
                  theme === THEMES.LIGHT
                    ? "search.svg"
                    : "/darkTheme/search.svg"
                }`}
                alt=""
              />
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 ps-7 bg-[#F3F3F3] sm:focus:w-60 transition-all duration-300 ease-out dark:bg-tertiary-dark text-[#1C1C1C33] dark:text-primary-light/20 rounded-[8px] text-sm w-40 focus:outline-none focus:ring-1 focus:ring-[#1C1C1C]"
              />
              <span className="absolute right-2 text-[#1C1C1C33] dark:text-primary-light/20">
                ⌘/
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className=" hover:bg-[#F3F3F3] rounded-[8px] dark:hover:bg-tertiary-dark hover-transition group"
            >
              <img
                className="sm:w-7 sm:h-7 w-6 h-6 group-hover:rotate-45 group-active:scale-90 transition-all duration-300 ease-in-out"
                src={`/icons/${
                  theme === THEMES.LIGHT ? "sun.svg" : "/darkTheme/sun.svg"
                }`}
                alt=""
              />
            </button>

            <button className=" hover:bg-[#F3F3F3] rounded-[8px] dark:hover:bg-tertiary-dark hover-transition group">
              <img
                className="sm:w-7 sm:h-7 w-6 h-6 group-hover:-rotate-360 group-active:scale-90 transition-all duration-300 ease-in-out"
                src={`/icons/${
                  theme === THEMES.LIGHT
                    ? "anticlock.svg"
                    : "/darkTheme/anticlock.svg"
                }`}
                alt=""
              />
            </button>

            <button className=" hover:bg-[#F3F3F3] rounded-[8px] relative dark:hover:bg-tertiary-dark hover-transition group">
              <img
                className="sm:w-7 sm:h-7 w-6 h-6 group-active:scale-90 transition-all duration-300 ease-in-out"
                src={`/icons/${
                  theme === THEMES.LIGHT ? "bell.svg" : "/darkTheme/bell.svg"
                }`}
                alt=""
              />
            </button>
            <button
              onClick={toggleRightSidebar}
              className=" hover:bg-[#F3F3F3] rounded-[8px] dark:hover:bg-tertiary-dark hover-transition group"
            >
              <img
                className="sm:w-7 sm:h-7 w-6 h-6 group-active:scale-90 transition-all duration-300 ease-in-out"
                src={`/icons/${
                  theme === THEMES.LIGHT ? "menu.svg" : "/darkTheme/menu.svg"
                }`}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(HeaderNavbar);
