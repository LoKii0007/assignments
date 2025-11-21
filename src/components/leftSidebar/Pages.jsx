import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { SIDEBAR_COMPONENTS, THEMES } from "@/utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const pagesItems = [
  {
    href: "/pages/user-profile",
    name: "user-profile",
    label: "User Profile",
    icon: "userProfile.svg",
    hasSubRoutes: true,
    subRoutes: [
      { href: "/pages/user-profile", name: "overview", label: "Overview" },
      { href: "/pages/user-profile", name: "projects", label: "Projects" },
      {
        href: "/pages/user-profile",
        name: "campaigns",
        label: "Campaigns",
      },
      {
        href: "/pages/user-profile",
        name: "documents",
        label: "Documents",
      },
      {
        href: "/pages/user-profile",
        name: "followers",
        label: "Followers",
      },
    ],
  },
  {
    href: "/pages/account",
    name: "account-settings",
    label: "Account",
    icon: "account.svg",
    hasSubRoutes: true,
    subRoutes: [
      { href: "/pages/account", name: "settings", label: "Settings" },
      { href: "/pages/account", name: "security", label: "Security" },
      { href: "/pages/account", name: "billing", label: "Billing" },
    ],
  },
  {
    href: "/pages/corporate",
    name: "corporate-settings",
    label: "Corporate",
    icon: "users.svg",
    hasSubRoutes: true,
    subRoutes: [
      { href: "/pages/corporate", name: "teams", label: "Teams" },
      { href: "/pages/corporate", name: "policies", label: "Policies" },
      { href: "/pages/corporate", name: "partners", label: "Partners" },
    ],
  },
  {
    href: "/pages/blog",
    name: "blog-settings",
    label: "Blog",
    icon: "blog.svg",
    hasSubRoutes: true,
    subRoutes: [
      { href: "/pages/blog", name: "articles", label: "Articles" },
      { href: "/pages/blog", name: "tutorials", label: "Tutorials" },
      { href: "/pages/blog", name: "news", label: "News" },
    ],
  },
  {
    href: "/pages/social",
    name: "social-settings",
    label: "Social",
    icon: "social.svg",
    hasSubRoutes: true,
    subRoutes: [
      { href: "/pages/social", name: "feed", label: "Feed" },
      { href: "/pages/social", name: "messages", label: "Messages" },
      { href: "/pages/social", name: "groups", label: "Groups" },
    ],
  },
];

const Pages = ({
  activeItem,
  setActiveItem,
  activeComponent,
  setActiveComponent,
}) => {
  const navigate = useNavigate();
  const { addToRecentItems, theme } = useAppContext();
  const pathname = useLocation().pathname;
  const handleItemClick = (item) => {
    setActiveItem(item.name);
    addToRecentItems(item.href);
    navigate(item.href);
  };

  useEffect(() => {
    if (pathname.includes("/pages")) {
      setActiveComponent(SIDEBAR_COMPONENTS.PAGES);
      const active = pathname.split("/").pop();
      console.log(active);
      setActiveItem(active);
    }
  }, [pathname]);

  return (
    <>
      <div className="sidebar-dashboard flex flex-col pb-3 font-[Inter]">
        <div className="text-sm text-[#1C1C1C66] dark:text-[#FFFFFF66] font-medium px-1 py-3">
          <p>Pages</p>
        </div>
        <div className="flex flex-col gap-1 relative">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {pagesItems.map((item, index) => (
              <>
                {item.hasSubRoutes ? (
                  <AccordionItem className="border-0!" value={`item-${index}`}>
                    <AccordionTrigger
                      className={cn(
                        "border-0! px-2! py-1! hover:outline-0! focus:outline-0! hover-transition justify-start font-normal!",
                        activeItem === item.name
                          ? "bg-[#F5F5F5] dark:bg-[#FFFFFF1A]"
                          : "hover:bg-[#F5F5F5]/50 dark:hover:bg-tertiary-dark"
                      )}
                      onClick={() => handleItemClick(item, index)}
                    >
                      <div
                        className="flex gap-1 text-primary-dark dark:text-primary-light"
                        key={item.href}
                      >
                        <div>
                          <img
                            src={`/icons/${
                              theme === THEMES.LIGHT
                                ? item.icon
                                : `darkTheme/${item.icon}`
                            }`}
                            alt=""
                          />
                        </div>
                        <p className="text-sm leading-[20px] tracking-[0px]">
                          {item.label}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="ps-13 pb-0">
                      <div className="flex flex-col gap-1 py-1">
                        {item.subRoutes.map((subRoute) => (
                          <button
                            key={subRoute.href}
                            className="text-left text-sm text-primary-dark hover:bg-[#F5F5F5] dark:text-primary-light dark:hover:bg-tertiary-dark rounded-[8px] px-2 py-1 hover-transition"
                          >
                            {subRoute.label}
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
                      <img src={`/icons/sidebar/${item.icon}`} alt="" />
                    </div>
                    <p className="text-sm ">{item.label}</p>
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
