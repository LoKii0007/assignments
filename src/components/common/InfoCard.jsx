import React from "react";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

const InfoCard = ({
  title,
  value,
  percentage,
  includeCurrency = false,
  color = null,
  darkColor = null,
  darkColorText = null,
  darkMode = false,
}) => {
  const { theme } = useAppContext();

  return (
    <>
      <div
        style={{
          backgroundColor: theme === THEMES.LIGHT ? color : darkColor,
          color: theme === THEMES.DARK ? darkColorText : "#1C1C1C",
        }}
        className="rounded-[16px] p-6 space-y-2 font-[Inter] leading-[20px] tracking-0"
      >
        <div className="text-sm font-semibold">{title}</div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold leading-[36px] tracking-0">
            {includeCurrency ? `$${value}` : value}
          </div>
          <div className="flex items-center text-xs leading-[18px] tracking-0 gap-1">
            <span>
              {percentage > 0 ? "+" : ""}
              {percentage}%
            </span>
            <img
              src={`/icons/${
                !darkMode ? "trending.svg" : "darkTheme/trending.svg"
              }`}
              alt=""
              className={`w-4 h-4 ${percentage < 0 ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
