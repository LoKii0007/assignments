import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { SIDEBAR_ITEMS, SIDEBAR_COMPONENTS } from "@/utils/constants";
import Pages from "./Pages";
import Recent from "./Recent";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(SIDEBAR_ITEMS.DEAFULT);
  const [activeComponent, setActiveComponent] = useState(
    SIDEBAR_COMPONENTS.DASHBOARD
  );

  return (
    <>
      <div className="sidebar flex flex-col gap-4 w-full px-4 py-5 border-r border-[#1C1C1C1A] dark:border-tertiary-dark">
        <div className="flex items-center gap-2">
          <img className="rounded-full w-6 h-6" src="/images/user.png" alt="" />
          <p className="text-primary-dark dark:text-primary-light">ByteWind</p>
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
