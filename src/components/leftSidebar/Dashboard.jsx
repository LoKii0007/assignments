import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SIDEBAR_COMPONENTS, THEMES, dashboardItems } from "@/utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const Dashboard = ({
  activeItem,
  setActiveItem,
  activeComponent,
  setActiveComponent,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionValue, setAccordionValue] = useState(undefined);
  const itemsRef = useRef([]);
  const parentRef = useRef(null);
  const [pillTop, setPillTop] = useState(0);
  const navigate = useNavigate();
  const { addToRecentItems, theme, isLeftSidebarOpen } = useAppContext();
  const pathname = useLocation().pathname;

  const handleItemClick = useCallback((item, index) => {
    setActiveItem(item.name);
    setActiveIndex(index);
    addToRecentItems(item.href);
    navigate(item.href);
  }, [setActiveItem, setActiveIndex, addToRecentItems, navigate]);

  const handleItemMouseEnter = useCallback((index) => {
    setActiveIndex(index);
  }, [setActiveIndex]);

  const handleItemMouseLeave = useCallback(() => {
    const index = dashboardItems.findIndex((item) => item.name === activeItem);
    setActiveIndex(index);
  }, [activeItem, setActiveIndex]);

  const updatePillPosition = useCallback(() => {
    if (itemsRef.current[activeIndex] && parentRef.current) {
      const itemRect = itemsRef.current[activeIndex].getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      setPillTop(itemRect.top - parentRect.top);
    }
  }, [activeIndex, itemsRef, parentRef]);

  useLayoutEffect(() => {
    updatePillPosition();
  }, [activeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePillPosition();
    }, 200);

    return () => clearTimeout(timer);
  }, [accordionValue, activeIndex]);

  useEffect(() => {
    if (pathname.includes("/dashboard")) {
      setActiveComponent(SIDEBAR_COMPONENTS.DASHBOARD);
      const active = pathname.split("/").pop();
      setActiveItem(active);
      const activeIndex = dashboardItems.findIndex(
        (item) => item.name === active
      );
      setActiveIndex(activeIndex);
    }
  }, [pathname]);

  return (
    <>
      <div className="sidebar-dashboard flex flex-col pb-3 font-[Inter]">
        <div
          className={`text-sm text-[#1C1C1C66] dark:text-[#FFFFFF66] font-medium px-1 py-3 flex items-center  `}
        >
          {isLeftSidebarOpen ? (
            <p>Dashboards</p>
          ) : (
            <img
              className="shrink-0 w-5 h-5"
              src={`/icons/${theme === THEMES.LIGHT ? "dashboards" : "darkTheme/dashboards"}.svg`}
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col gap-1 relative" ref={parentRef}>
          <div
            style={{
              top: `${pillTop}px`,
            }}
            className={cn(
              "absolute w-1 h-7 left-0 flex items-center justify-center transition-all duration-200 ease-in-out",
              activeComponent === SIDEBAR_COMPONENTS.DASHBOARD
                ? "opacity-100"
                : "opacity-0"
            )}
          >
            <div className="w-1 h-4 bg-primary-dark dark:bg-[#C6C7F8] rounded-full"></div>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            {dashboardItems.map((item, index) => (
              <>
                {item.hasSubRoutes ? (
                  <AccordionItem
                    className="border-0!"
                    value={`item-${index}`}
                    ref={(el) => (itemsRef.current[index] = el)}
                    key={index}
                  >
                    <AccordionTrigger
                      className={cn(
                        "border-0! px-2! py-1! hover:outline-0! focus:outline-0! justify-start font-normal! hover:cursor-pointer hover-transition",
                        activeItem === item.name
                          ? "bg-[#F5F5F5] dark:bg-[#FFFFFF1A]"
                          : " hover:bg-[#F5F5F5]/50 dark:hover:bg-tertiary-dark"
                      )}
                      onClick={() => handleItemClick(item, index)}
                      onMouseEnter={() => handleItemMouseEnter(index)}
                      onMouseLeave={() => handleItemMouseLeave()}
                    >
                      <>
                        <img
                          className="w-4 h-4 pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200"
                          src={
                            theme === THEMES.LIGHT
                              ? "/icons/chevronDown.svg"
                              : "/icons/darkTheme/chevronDown.svg"
                          }
                          alt=""
                        />

                        <div
                          className="flex gap-1 text-primary-dark dark:text-primary-light"
                          key={item.href}
                        >
                          <div className="shrink-0 w-5 h-5">
                            <img
                              className="shrink-0 w-5 h-5"
                              src={`/icons/${
                                theme === THEMES.LIGHT
                                  ? item.icon
                                  : `darkTheme/${item.icon}`
                              }.svg`}
                              alt=""
                            />
                          </div>
                          {isLeftSidebarOpen && (
                            <p
                              className={`text-sm leading-[20px] tracking-[0px] transition-all `}
                            >
                              {item.label}
                            </p>
                          )}
                        </div>
                      </>
                    </AccordionTrigger>
                    <AccordionContent
                      className={` pb-0 ${
                        isLeftSidebarOpen ? "ps-13" : "ps-5"
                      }`}
                    >
                      <div className="flex flex-col gap-1 py-1">
                        {item.subRoutes.map((subRoute) => (
                          <button
                            key={subRoute.href}
                            className="text-left text-sm text-primary-dark hover:bg-[#F5F5F5] dark:text-primary-light dark:hover:bg-tertiary-dark rounded-[8px] px-2 py-1 hover-transition"
                          >
                            {!isLeftSidebarOpen ? (
                              <img
                                className="shrink-0 w-5 h-5"
                                src={`/icons/${
                                  theme === THEMES.LIGHT
                                    ? item.icon
                                    : `darkTheme/${item.icon}`
                                }.svg`}
                                alt=""
                              />
                            ) : (
                              subRoute.label
                            )}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div
                    ref={(el) => (itemsRef.current[index] = el)}
                    className={cn(
                      "flex gap-1 text-primary-dark dark:text-primary-light px-2 py-1 rounded-[8px] hover:cursor-pointer hover-transition ",
                      activeItem === item.name && activeComponent === SIDEBAR_COMPONENTS.DASHBOARD
                        ? "bg-[#F5F5F5] dark:bg-[#FFFFFF1A]"
                        : "hover:bg-[#F5F5F5] dark:hover:bg-tertiary-dark"
                    )}
                    key={item.href}
                    onClick={() => handleItemClick(item, index)}
                    onMouseEnter={() => handleItemMouseEnter(index)}
                    onMouseLeave={() => handleItemMouseLeave()}
                  >
                    <div className="w-4 h-4 shrink-0"></div>
                    <div className="shrink-0 w-5 h-5">
                      <img
                        className="shrink-0 w-5 h-5"
                        src={`/icons/${
                          theme === THEMES.LIGHT
                            ? item.icon
                            : `darkTheme/${item.icon}`
                        }.svg`}
                        alt=""
                      />
                    </div>
                    {isLeftSidebarOpen && (
                      <p className="text-sm leading-[20px] tracking-[0px]">
                        {item.label}
                      </p>
                    )}
                  </div>
                )}
              </>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default React.memo(Dashboard);
