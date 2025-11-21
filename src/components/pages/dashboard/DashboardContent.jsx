import React from "react";
import InfoCard from "@/components/common/InfoCard";
import DoubleBarChart from "@/components/charts/DoubleBarChart";
import ProductList from "./ProductList";
import Chart from "@/components/charts/LineChart";
import PieChartWithPaddingAngle from "@/components/charts/PieChart";
import ExampleChart from "@/components/charts/ExampleChart";
import WorldMap from "@/components/charts/WorldMap";
import { THEMES } from "@/utils/constants";
import { useAppContext } from "@/context/AppContext";

const sampleSalesData = [
  { name: "Direct", value: 300.56, fill: "#1C1C1C", darkFill: "#C6C7F8" },
  {
    name: "Affiliate",
    value: 135.18,
    fill: "#BAEDBD",
    darkFill: "#BAEDBD",
  },
  {
    name: "Sponsored",
    value: 154.02,
    fill: "#95A4FC",
    darkFill: "#95A4FC",
  },
  { name: "E-mail", value: 48.96, fill: "#B1E3FF", darkFill: "#B1E3FF" },
];

const locationData = [
  { name: "New York", value: 72000 },
  { name: "San Francisco", value: 39000 },
  { name: "Sydney", value: 25000 },
  { name: "Singapore", value: 61000 },
];

const infoData = [
  {
    title: "Customers",
    value: "3,781",
    percentage: 11.01,
    color: "#E3F5FF",
    darkColor: "#E3F5FF",
    darkColorText: "#1C1C1C",
    darkMode: false,
  },

  {
    title: "Orders",
    value: "1,219",
    percentage: -0.03,
    color: "#F7F9FB",
    darkColor: "#FFFFFF0D",
    darkColorText: "#FFFFFF",
    darkMode: true,
  },

  {
    title: "Revenue",
    value: "$695",
    percentage: 15.03,
    color: "#F7F9FB",
    darkColor: "#FFFFFF0D",
    darkColorText: "#FFFFFF",
    darkMode: true,
  },
  {
    title: "Growth",
    value: "30.1%",
    percentage: 6.08,
    color: "#E5ECF6",
    darkColor: "#E5ECF6",
    darkColorText: "#1C1C1C",
    darkMode: false,
  },
];

const DashboardContent = () => {
  const { theme } = useAppContext();
  return (
    <main className="flex-1 overflow-y-auto p-8 h-full w-full">
      {/* Header Section */}
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-primary-dark dark:text-primary-light">
          eCommerce
        </h1>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-4 gap-7 ">
        <div className="grid grid-cols-2 col-span-2 gap-7">
          {/* Customers Card */}
          {infoData.map((item, idx) => (
            <InfoCard
              key={idx}
              title={item.title}
              value={item.value}
              percentage={item.percentage}
              color={item.color}
              darkColor={item.darkColor}
              darkColorText={item.darkColorText}
              darkMode={item.darkMode}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 col-span-2">
          {/* Projections vs Actuals Chart */}
          <div className="col-span-2 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-[16px] p-6 h-full flex flex-col gap-8 w-full">
            <h3 className="text-sm font-semibold text-primary-dark dark:text-primary-light leading-[20px] tracking-0">
              Projections vs Actuals
            </h3>
            <DoubleBarChart />
          </div>
        </div>

        {/* Revenue Line Chart */}
        <div className="col-span-3 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-6 rounded-[16px] font-[Inter] flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold text-primary-dark dark:text-primary-light leading-[20px] tracking-0">
              Revenue
            </h3>
            <p className="text-sm text-[#1C1C1C33] dark:text-[#FFFFFF33] leading-[20px] tracking-0">
              |
            </p>
            <div className="flex items-center text-xs py-0.5 ps-1 pe-2">
              <div className="h-4 w-4 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary-dark dark:bg-[#C6C7F8] rounded-full"></div>
              </div>
              <p className="text-xs text-primary-dark dark:text-primary-light leading-[18px] tracking-0">
                Current Week<span className="font-semibold ps-2">$58,211</span>
              </p>
            </div>
            <div className="flex items-center text-xs py-0.5 ps-1 pe-2">
              <div className="h-4 w-4 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#A8C5DA] rounded-full"></div>
              </div>
              <p className="text-xs text-primary-dark dark:text-primary-light leading-[18px] tracking-0">
                Previous Week<span className="font-semibold ps-2">$68,768</span>
              </p>
            </div>
          </div>
          <Chart />
        </div>

        <div className="bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-6 rounded-[16px] space-y-4 flex flex-col font-[Inter]">
          <h3 className="text-sm font-semibold text-primary-dark dark:text-primary-light leading-[20px] tracking-0 shrink-0">
            Revenue by Location
          </h3>
          <div className="flex justify-center relative flex-1 min-h-[120px] min-w-[120px] overflow-hidden">
            <WorldMap />
          </div>
          <div className="space-y-4">
            {locationData.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-xs text-primary-dark dark:text-primary-light leading-[18px] tracking-0"
              >
                <div className="flex w-full justify-between items-center">
                  <p>{item.name}</p>
                  <p>{item.value.toLocaleString().slice(0, 2)}K</p>
                </div>
                <div className="w-full h-[2px] bg-[#E6EEF5] dark:bg-[#444C53] rounded-full">
                  <div
                    style={{ width: `${(item.value / 100000) * 100}%` }}
                    className="h-[2px] bg-[#A8C5DA] rounded-full"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products Table */}
        <ProductList />

        {/* Total Sales Donut Chart */}
        <div className="bg-[#F7F9FB] dark:bg-[#FFFFFF0D] p-6 rounded-[16px] space-y-4 flex flex-col font-[Inter]">
          <h3 className="text-sm font-semibold text-primary-dark leading-[20px] tracking-0 shrink-0 dark:text-primary-light">
            Total Sales
          </h3>
          <div className="flex justify-center relative flex-1 min-h-[120px] min-w-[120px]">
            <PieChartWithPaddingAngle data={sampleSalesData} />
            {/* <ExampleChart /> */}
          </div>
          <div className="space-y-3">
            {sampleSalesData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between gap-1 items-center text-xs text-primary-dark leading-[18px] tracking-0 dark:text-primary-light"
              >
                <div className="flex items-center py-0.5 pe-2 ps-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div
                      style={{ backgroundColor: theme === THEMES.LIGHT ? item.fill : item.darkFill }}
                      className="w-1.5 h-1.5 rounded-full"
                    ></div>
                  </div>
                  <span className="">{item.name}</span>
                </div>
                <span className="shrink-0">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
