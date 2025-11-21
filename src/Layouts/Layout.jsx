import React from "react";
import Sidebar from "@/components/leftSidebar/Sidebar";
import { Outlet } from "react-router-dom";
import RightSidebar from "@/components/RightSidebar";
import HeaderNavbar from "@/components/common/HeaderNavbar";

const Layout = () => {
  return (
    <>
      <div className="layout w-screen h-screen flex bg-primary-light dark:bg-primary-dark">
        <div className="w-[212px] h-full flex shrink-0 overflow-y-auto custom-scrollbar">
          <Sidebar />
        </div>
        <div className="flex flex-1 w-full h-full">
          <div className="flex h-screen w-full">
            <div className="flex-1 flex flex-col overflow-hidden w-full">
              <HeaderNavbar />
              <Outlet />
            </div>
          </div>
        </div>
        <div className="w-[280px] shrink-0 overflow-y-auto custom-scrollbar">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
