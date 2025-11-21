import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { getRoundedMax } from "../../utils/helpers";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

const sampleData = [
  { month: "Jan", projection: 10000000, actual: 15000000 },
  { month: "Feb", projection: 18000000, actual: 10000000 },
  { month: "Mar", projection: 15000000, actual: 12000000 },
  { month: "Apr", projection: 12000000, actual: 18000000 },
  { month: "May", projection: 15000000, actual: 22500000 },
  { month: "Jun", projection: 25000000, actual: 22000000 },
];

const Chart = () => {
 const { theme } = useAppContext();

  const allValues = sampleData.flatMap((item) => [
    item.projection,
    item.actual,
  ]);

  const maxValue = Math.max(...allValues);

  const roundedMax = getRoundedMax(maxValue);


  return (
    <div className=" flex w-full h-full gap-4 flex-1 min-h-[235px]">
      <div className="flex flex-col h-full">
        <div className="flex-1 relative h-full mb-3">
          <h6 className="absolute top-0 right-0 text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] leading-[18px] tracking-0 -translate-y-full">
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
        <div className="shrink-0 opacity-0 text-xs text-[#1C1C1C66] leading-[18px] tracking-0">
          30m
        </div>
      </div>
      <div className="flex flex-col h-full w-full relative">
        <div className="w-full h-full flex flex-1 mb-3 justify-center relative">
          <div className="h-[1px] w-full bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] absolute top-0 left-0"></div>
          <div className="h-[1px] w-full bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] absolute top-1/3 left-0"></div>
          <div className="h-[1px] w-full bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] absolute top-2/3 left-0"></div>
          <div className="h-[1px] w-full bg-[#1C1C1C33] dark:bg-[#FFFFFF33] absolute bottom-0 left-0"></div>
          <ResponsiveContainer width="90%" height="100%" className="">
            <LineChart data={sampleData}>

              <ReferenceLine y={20000000} stroke="#1C1C1C0D" />
              <XAxis
                dataKey="month"
                allowDuplicatedCategory={false}
                hide={true}
              />
              <YAxis domain={[0, roundedMax]} hide={true} width={0} />

              {/* Blue projection line */}
              <Line
                type="natural"
                dataKey="projection"
                stroke="#A8C5DA"
                strokeWidth={3}
                dot={false}
              />

              {/* Actual line — normal (before dashed segment) */}
              <Line
                type="natural"
                data={sampleData.slice(0, 4)}
                dataKey="actual"
                stroke={theme === THEMES.LIGHT ? "#1C1C1C" : "#C6C7F8"}
                strokeWidth={3}
                dot={false}
              />

              {/* Dashed section */}
              <Line
                type="natural"
                data={sampleData.slice(3, sampleData.length)}
                dataKey="actual"
                stroke={theme === THEMES.LIGHT ? "#1C1C1C" : "#C6C7F8"}
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={false}
              />

              <Tooltip
                cursor={{ stroke: "#ccc", strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  border: "1px solid #eee",
                  fontSize: 12,
                  fontWeight: 400,
                  fontFamily: "Inter",
                  color: "#1C1C1C",
                  padding: 10,
                  borderRadius: 8,
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-6 w-[90%]">
            {sampleData.map((item) => (
              <div
                className="shrink-0 flex items-center justify-center text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] "
                key={item.month}
              >
                {item.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
