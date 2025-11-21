import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SIDEBAR_COMPONENTS, THEMES, pagesItems } from "@/utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const Pages = ({
  activeItem,
  setActiveItem,
  activeComponent,
  setActiveComponent,
}) => {
  const navigate = useNavigate();
  const { addToRecentItems, theme, isLeftSidebarOpen } = useAppContext();
  const pathname = useLocation().pathname;
  const [accordionValue, setAccordionValue] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    addToRecentItems(item.href);
    navigate(item.href);
  };

  useEffect(() => {
    if (pathname.includes("/pages")) {
      setActiveComponent(SIDEBAR_COMPONENTS.PAGES);

      const matchingItem = pagesItems.find((item) => 
        pathname === item.href || pathname.startsWith(item.href + "/")
      );
      
      if (matchingItem) {
        setActiveItem(matchingItem.name);
        const itemIndex = pagesItems.findIndex((item) => item.name === matchingItem.name);
        if (itemIndex !== -1 && matchingItem.hasSubRoutes) {
          setAccordionValue(`item-${itemIndex}`);
        }
      }
    }
  }, [pathname, setActiveComponent, setActiveItem]);

  return (
    <>
      <div className="sidebar-dashboard flex flex-col pb-3 font-[Inter]">
        <div className="text-sm text-[#1C1C1C66] dark:text-[#FFFFFF66] font-medium px-1 py-3">
          {isLeftSidebarOpen ? (
            <p>Pages</p>
          ) : (
            <img className="shrink-0 w-5 h-5" src={`/icons/${theme === THEMES.LIGHT ? "pages" : "darkTheme/pages"}.svg`} alt="" />
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            {pagesItems.map((item, index) => (
              <>
                {item.hasSubRoutes ? (
                  <AccordionItem className="border-0!" value={`item-${index}`}>
                    <AccordionTrigger
                      className={cn(
                        "border-0! px-2! py-1! hover:outline-0! focus:outline-0! hover-transition justify-start font-normal!",
                        activeItem === item.name && activeComponent === SIDEBAR_COMPONENTS.PAGES
                          ? "bg-[#F5F5F5] dark:bg-[#FFFFFF1A]"
                          : "hover:bg-[#F5F5F5]/50 dark:hover:bg-tertiary-dark"
                      )}
                      onClick={() => handleItemClick(item, index)}
                    >
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
                          <p className="text-sm leading-[20px] tracking-[0px]">
                            {item.label}
                          </p>
                        )}
                      </div>
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
                    className={cn(
                      "flex gap-1 text-primary-dark px-2 py-1 rounded-[8px]",
                      activeItem === item.name
                        ? "bg-[#F5F5F5]!"
                        : "bg-white! hover:bg-[#F5F5F5]!"
                    )}
                    key={item.href}
                    onClick={() => handleItemClick(item, index)}
                  >
                    <div className="w-4 h-4"></div>
                    <div>
                      <img src={`/icons/${item.icon}.svg`} alt="" />
                    </div>
                    {isLeftSidebarOpen && (
                      <p className="text-sm ">{item.label}</p>
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

export default Pages;
