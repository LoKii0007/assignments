import React, { useState } from "react";
import { RECENT_TABS, THEMES } from "@/utils/constants";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ item, isPath = false }) => {
  const navigate = useNavigate();
  const { addToRecentItems } = useAppContext();
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

  return (
    <>
      <div
        key={href}
        className="flex text-primary-dark dark:text-primary-light px-2 py-1 rounded-[8px] hover:cursor-pointer items-center leading-[20px] tracking-0 gap-1"
        onClick={handleClick}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#1C1C1C33] dark:bg-[#FFFFFF33] rounded-full"></div>
        </div>

        <span>{label}</span>
      </div>
    </>
  );
};

const RecentTab = ({ activeTab, setActiveTab, label, value }) => {
  const handleTabClick = () => {
    setActiveTab(value);
  };

  return (
    <>
      <button
        className={`font-normal leading-[20px] tracking-0 ${
          activeTab === value ? "text-[#1C1C1C66] dark:text-secondary-dark" : "text-[#1C1C1C33] dark:text-[#FFFFFF33]"
        }`}
        onClick={handleTabClick}
      >
        {label}
      </button>
    </>
  );
};

const Recent = () => {
  const [activeTab, setActiveTab] = useState(RECENT_TABS.FAVOURITES);
  const { favouriteItems = [], recentlyItems = [], theme } = useAppContext();

  return (
    <>
      <div className="sidebar-recent flex flex-col pb-3 font-[Inter]">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <RecentTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            label="Favourites"
            value={RECENT_TABS.FAVOURITES}
          />
          <RecentTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            label="Recently"
            value={RECENT_TABS.RECENTLY}
          />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          {activeTab === RECENT_TABS.RECENTLY ? (
            <>
              {recentlyItems?.length > 0
                ? recentlyItems.map((path) => (
                    <MenuItem key={path} item={path} isPath={true} />
                  ))
                : ""}
            </>
          ) : (
            <>
              {favouriteItems?.length > 0
                ? favouriteItems.map((path) => (
                    <MenuItem key={path} item={path} isPath={true} />
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
