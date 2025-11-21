import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";

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

export default function PieChartWithPaddingAngle() {
  const total = sampleSalesData.reduce((acc, item) => acc + item.value, 0);
  const { theme } = useAppContext();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>

        <Tooltip
          content={({ active, payload }) => {
            if (active && payload?.length) {
              const data = payload[0].payload;
              const percent = ((data.value / total) * 100).toFixed(1);

              return (
                <div className="px-2 py-1 rounded-[8px] bg-[#1C1C1CCC] ">
                  <p className="text-xs text-white font-[Inter]">
                    {percent}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Pie
          data={sampleSalesData}
          dataKey="value"
          innerRadius="60%"
          outerRadius="100%"
          paddingAngle={-10}
          cornerRadius={50}
          stroke={theme === THEMES.LIGHT ? "#F7F9FB" : "#282828"}
          strokeWidth={5}
          isAnimationActive={false}
        >
          {sampleSalesData.map((entry, index) => (
            <Cell key={index} fill={theme === THEMES.LIGHT ? entry.fill : entry.darkFill} />
          ))}
        </Pie>

      </PieChart>
    </ResponsiveContainer>
  );
}
