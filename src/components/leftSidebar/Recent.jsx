import React, { useState } from "react";
import {
  RECENT_TABS,
  THEMES,
  dashboardItems,
  pagesItems,
} from "@/utils/constants";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ item, isPath = false, isLeftSidebarOpen }) => {
  const navigate = useNavigate();
  const { addToRecentItems, theme } = useAppContext();
  const href = isPath ? item : item.href;
  const label = isPath
    ? item
        .split("/")
        .filter(Boolean)
        .pop()
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : item.label;

  const handleClick = (e) => {
    e.preventDefault();
    addToRecentItems(href);
    navigate(href);
  };

  const getIcon = () => {
    if (item.includes("dashboard")) {
      const dashboardItem = dashboardItems.find((item) => item.href === href);
      if (theme === THEMES.LIGHT) {
        return `/icons/${dashboardItem.icon}.svg`;
      } else {
        return `/icons/darkTheme/${dashboardItem.icon}.svg`;
      }
    } else if (item.includes("pages")) {
      const pageItem = pagesItems.find((item) => item.href === href);
      if (theme === THEMES.LIGHT) {
        return `/icons/${pageItem.icon}.svg`;
      } else {
        return `/icons/darkTheme/${pageItem.icon}.svg`;
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <div
        key={href}
        className="flex text-primary-dark dark:text-primary-light px-2 py-1 rounded-[8px] hover:cursor-pointer items-center leading-[20px] tracking-0 gap-1 hover-transition hover:bg-[#F5F5F5] dark:hover:bg-tertiary-dark"
        onClick={handleClick}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#1C1C1C33] dark:bg-[#FFFFFF33] rounded-full"></div>
        </div>

        {isLeftSidebarOpen ? (
          <span>{label}</span>
        ) : (
          <img className="w-5 h-5" src={getIcon()} alt="" />
        )}
      </div>
    </>
  );
};

const RecentTab = ({
  activeTab,
  setActiveTab,
  label,
  value,
  isLeftSidebarOpen,
  icon,
}) => {
  const handleTabClick = () => {
    setActiveTab(value);
  };

  return (
    <>
      <button
        className={`font-normal leading-[20px] tracking-0 rounded-[8px] ${
          activeTab === value
            ? "text-[#1C1C1C66] dark:text-secondary-dark"
            : "text-[#1C1C1C33] dark:text-[#FFFFFF33]"
        }
        ${
          !isLeftSidebarOpen && activeTab === value
            ? "bg-[#F5F5F5] dark:bg-tertiary-dark"
            : ""
        }
        `}
        onClick={handleTabClick}
      >
        {isLeftSidebarOpen ? (
          label
        ) : (
          <img className="w-7 h-7" src={icon} alt="" />
        )}
      </button>
    </>
  );
};

const Recent = () => {
  const [activeTab, setActiveTab] = useState(RECENT_TABS.FAVOURITES);
  const {
    favouriteItems = [],
    recentlyItems = [],
    theme,
    isLeftSidebarOpen,
  } = useAppContext();

  return (
    <>
      <div className="sidebar-recent flex flex-col pb-3 font-[Inter] space-y-1">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <RecentTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            label="Favourites"
            value={RECENT_TABS.FAVOURITES}
            icon={
              theme === THEMES.LIGHT
                ? "/icons/star.svg"
                : "/icons/darkTheme/star.svg"
            }
            isLeftSidebarOpen={isLeftSidebarOpen}
          />
          <RecentTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            label="Recently"
            value={RECENT_TABS.RECENTLY}
            isLeftSidebarOpen={isLeftSidebarOpen}
            icon={
              theme === THEMES.LIGHT
                ? "/icons/anticlock.svg"
                : "/icons/darkTheme/anticlock.svg"
            }
          />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          {activeTab === RECENT_TABS.RECENTLY ? (
            <>
              {recentlyItems?.length > 0
                ? recentlyItems.map((path) => (
                    <MenuItem
                      key={path}
                      item={path}
                      isPath={true}
                      isLeftSidebarOpen={isLeftSidebarOpen}
                    />
                  ))
                : ""}
            </>
          ) : (
            <>
              {favouriteItems?.length > 0
                ? favouriteItems.map((path) => (
                    <MenuItem
                      key={path}
                      item={path}
                      isPath={true}
                      isLeftSidebarOpen={isLeftSidebarOpen}
                    />
                  ))
                : ""}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Recent;
