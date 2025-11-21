import React from "react";
import { Bug, UserPlus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

const notifications = [
  {
    icon: Bug,
    title: "You have a bug that needs...",
    time: "Just now",
    color: "bg-gray-100",
    type: "bug",
  },
  {
    icon: UserPlus,
    title: "New user registered",
    time: "59 minutes ago",
    color: "bg-gray-100",
    type: "user",
  },
  {
    icon: Bug,
    title: "You have a bug that needs...",
    time: "12 hours ago",
    color: "bg-gray-100",
    type: "bug",
  },
  {
    icon: Zap,
    title: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
    color: "bg-gray-100",
    type: "subscription",
  },
];

const activities = [
  {
    imgUrl: "sample-1.png",
    title: "You have a bug that needs abkjasb",
    time: "Just now",
  },
  {
    imgUrl: "sample-2.png",
    title: "Released a new version",
    time: "59 minutes ago",
  },
  { imgUrl: "sample-3.png", title: "Submitted a bug", time: "12 hours ago" },
  {
    imgUrl: "sample-4.png",
    title: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    imgUrl: "sample-5.png",
    title: "Deleted a page in Project X",
    time: "Feb 2, 2023",
  },
];

const contacts = [
  {
    name: "Natali Craig",
    imgUrl: "contact-1.png",
  },
  {
    name: "Drew Cano",
    imgUrl: "contact-2.png",
  },
  {
    name: "Orlando Diggs",
    imgUrl: "contact-3.png",
  },
  {
    name: "Andi Lane",
    imgUrl: "contact-4.png",
  },
  {
    name: "Kate Morrison",
    imgUrl: "contact-5.png",
  },
  {
    name: "Koray Okumus",
    imgUrl: "contact-6.png",
  },
];

const RightSidebar = () => {
  const { theme } = useAppContext();
  return (
    <aside className="w-full border-l border-[#1C1C1C1A] p-5 space-y-6 font-[Inter]">
      {/* Notifications Section */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-primary-dark dark:text-primary-light py-2 px-1 leading-[20px] tracking-0">
          Notifications
        </h2>
        <div className="space-y-2">
          {notifications.map((notif, idx) => (
            <div key={idx} className="flex items-start space-x-2 p-1">
              <div
                className={cn(
                  "p-2 rounded-[8px] ",
                  notif.type === "bug" && "bg-[#E3F5FF]",
                  notif.type === "user" && "bg-[#E5ECF6]",
                  notif.type === "subscription" && "bg-[#E5ECF6]"
                )}
              >
                {notif.type === "bug" && (
                  <img src="/icons/bugBeetle.svg" alt="" className="w-4 h-4" />
                )}
                {notif.type === "user" && (
                  <img src="/icons/user.svg" alt="" className="w-4 h-4" />
                )}
                {notif.type === "subscription" && (
                  <img src="/icons/broadcast.svg" alt="" className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 ">
                <p className="text-sm text-primary-dark dark:text-primary-light leading-[20px] tracking-0 line-clamp-1">
                  {notif.title}
                </p>
                <p className="text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0 line-clamp-1">
                  {notif.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-primary-dark dark:text-primary-light py-2 px-1 leading-[20px] tracking-0">
          Activities
        </h2>
        <div className="space-y-2">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-start space-x-2 p-1">
              <div className="flex  items-center justify-center relative h-full">
                <img
                  src={`/images/${activity.imgUrl}`}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                {idx !== activities.length - 1 && (
                  <div className="w-[1px] h-[14px] bg-[#1C1C1C1A] dark:bg-[#FFFFFF1A] absolute top-8"></div>
                )}
              </div>
              <div className="flex-1 ">
                <p className="text-sm text-primary-dark dark:text-primary-light leading-[20px] tracking-0 line-clamp-1">
                  {activity.title}
                </p>
                <p className="text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0 line-clamp-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-primary-dark dark:text-primary-light py-2 px-1 leading-[20px] tracking-0">
          Contacts
        </h2>
        <div className="space-y-2">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-start space-x-2 p-1">
              <div className="flex items-center justify-center relative">
                <img
                  src={`/images/${contact.imgUrl}`}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div className="flex-1 ">
                <p className="text-sm text-primary-dark dark:text-primary-light leading-[20px] tracking-0 line-clamp-1">
                  {contact.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
