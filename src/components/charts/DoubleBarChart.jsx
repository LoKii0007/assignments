import React from "react";
import { getRoundedMax } from "../../utils/helpers";

const sampleData = [
  {
    month: "Jan",
    projection: 21974530,
    actual: 17936202,
  },
  {
    month: "Feb",
    projection: 26019152,
    actual: 21692639,
  },
  {
    month: "Mar",
    projection: 22133991,
    actual: 19539268,
  },
  {
    month: "Apr",
    projection: 29334125,
    actual: 23481127,
  },
  {
    month: "May",
    projection: 19635513,
    actual: 17525674,
  },
  {
    month: "Jun",
    projection: 26066167,
    actual: 21680523,
  },
];

const DoubleBarChart = () => {
  const allValues = sampleData.flatMap((item) => [
    item.projection,
    item.actual,
  ]);

  const maxValue = Math.max(...allValues);

  const roundedMax = getRoundedMax(maxValue);

  return (
    <>
      <div className="bar-chart flex w-full h-full gap-4 flex-1">
        <div className="flex flex-col h-full">
          <div className="flex-1 relative h-full mb-3">
            <h6 className="absolute top-0 right-0 text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66]  leading-[18px] tracking-0 -translate-y-full">
              {roundedMax.toString().slice(0, 2)}M
            </h6>
            <h6 className="absolute top-1/3 right-0 text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0 -translate-y-full">
              {((roundedMax / 3) * 2).toString().slice(0, 2)}M
            </h6>
            <h6 className="absolute top-2/3 right-0 text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0 -translate-y-full">
              {(roundedMax / 3).toString().slice(0, 2)}M
            </h6>
            <h6 className="absolute bottom-0 right-0 text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0">
              0
            </h6>
          </div>
          <div className="shrink-0 opacity-0 text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0">
            30m
          </div>
        </div>
        <div className="grid grid-cols-6 h-full w-full">
          {sampleData.map((item) => (
            <div key={item.month} className="flex flex-col">
              <div className="flex-1 flex justify-center relative border-b border-[#1C1C1C0D] dark:border-[#FFFFFF1A] mb-3">
                <div
                  style={{ height: `${(item.projection / roundedMax) * 100}%` }}
                  className="bg-[#A8C5DA] z-20 w-5 absolute bottom-0 opacity-50 rounded-t-[4px]"
                ></div>
                <div
                  style={{ height: `${(item.actual / roundedMax) * 100}%` }}
                  className="bg-[#A8C5DA] z-10 w-5 absolute bottom-0"
                ></div>
                <div className="h-[1px] w-full bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] absolute top-0 left-0"></div>
                <div className="h-[1px] w-full bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] absolute top-1/3 left-0"></div>
                <div className="h-[1px] w-full bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] absolute top-2/3 left-0"></div>
              </div>
              <div className="shrink-0 flex items-center justify-center text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoubleBarChart;
