import React, { useCallback, useEffect, useRef } from "react";
import Sidebar from "@/components/leftSidebar/Sidebar";
import { Outlet } from "react-router-dom";
import RightSidebar from "@/components/RightSidebar";
import HeaderNavbar from "@/components/common/HeaderNavbar";
import { useAppContext } from "@/context/AppContext";
import useWindow from "@/hooks/useWindow";

const Layout = () => {
  const { isRightSidebarOpen, isLeftSidebarOpen } = useAppContext();
  const { isSmall, isMobile, isDesktop } = useWindow();
  const mainRef = useRef(null);
  const { isTablet } = useWindow({ ref: mainRef });

  const getLeftSidebarClass = useCallback(
    (isSmall, isOpen) => {
      if (isSmall) {
        if (isOpen) {
          return `absolute w-[212px] translate-x-0`;
        } else {
          return `absolute w-[212px] -translate-x-full`;
        }
      } else {
        if (isOpen) {
          return `relative w-[212px]`;
        } else {
          return `relative w-[88px]`;
        }
      }
    },
    [isSmall, isLeftSidebarOpen]
  );

  const getRightSidebarClass = useCallback(
    (isSmall, isOpen) => {
      if (!isDesktop) {
        if (isOpen) {
          return `absolute w-[280px] translate-x-0 `;
        } else {
          return `absolute w-[280px] translate-x-full`;
        }
      } else {
        if (isOpen) {
          return `relative w-[280px]`;
        } else {
          return `relative w-0`;
        }
      }
    },
    [isSmall, isRightSidebarOpen, isDesktop]
  );

  return (
    <>
      <div ref={mainRef} className="layout w-screen h-screen flex bg-primary-light dark:bg-primary-dark relative overflow-x-hidden">
        <div
          className={` h-full flex shrink-0 overflow-y-auto custom-scrollbar transition-all duration-300 left-0 top-0 bg-primary-light dark:bg-primary-dark z-40 ${getLeftSidebarClass(
            isSmall,
            isLeftSidebarOpen
          )}`}
        >
          <Sidebar />
        </div>
        <div className="flex flex-1 w-full h-full z-30 max-w-screen">
          <div className="flex h-screen w-full">
            <div className="flex-1 flex flex-col overflow-hidden w-full">
              <HeaderNavbar />
              <Outlet />
            </div>
          </div>
        </div>
        <div
          className={`h-full flex shrink-0 overflow-y-auto custom-scrollbar transition-all right-0 duration-300 top-0  bg-primary-light dark:bg-primary-dark z-40 ${getRightSidebarClass(
            isSmall,
            isRightSidebarOpen
          )}`}
        >
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Layout;
