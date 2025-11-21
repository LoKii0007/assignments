import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { SIDEBAR_ITEMS, SIDEBAR_COMPONENTS, THEMES } from "@/utils/constants";
import Pages from "./Pages";
import Recent from "./Recent";
import { useAppContext } from "@/context/AppContext";
import useWindow from "@/hooks/useWindow";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(SIDEBAR_ITEMS.DEAFULT);
  const [activeComponent, setActiveComponent] = useState(
    SIDEBAR_COMPONENTS.DASHBOARD
  );
  const { isLeftSidebarOpen, toggleLeftSidebar, theme } = useAppContext();
  const { isSmall } = useWindow();

  return (
    <>
      <div className="sidebar flex flex-col gap-4 w-full px-4 py-5 border-r border-[#1C1C1C1A] dark:border-tertiary-dark">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center ${
              isLeftSidebarOpen ? "" : "justify-center"
            } gap-2`}
          >
            <img
              className="rounded-full w-6 h-6"
              src="/images/user.png"
              alt=""
            />
            {isLeftSidebarOpen && (
              <p className="text-primary-dark dark:text-primary-light">
                ByteWind
              </p>
            )}
          </div>
          {isSmall && (
            <button
              onClick={toggleLeftSidebar}
              className=" hover:bg-[#F3F3F3] rounded-[8px] dark:hover:bg-tertiary-dark hover-transition"
            >
              <img
                className="w-7 h-7"
                src={`/icons/${
                  theme === THEMES.LIGHT ? "menu.svg" : "/darkTheme/menu.svg"
                }`}
                alt=""
              />
            </button>
          )}
        </div>
        <Recent />
        <Dashboard
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <Pages
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
      </div>
    </>
  );
};

export default Sidebar;
