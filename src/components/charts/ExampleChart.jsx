import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

const sampleSalesData = [
  { name: "Direct", value: 300.56, fill: "#1C1C1C" },
  { name: "Sponsored", value: 154.02, fill: "#95A4FC" },
  { name: "Affiliate", value: 135.18, fill: "#BAEDBD" },
  { name: "E-mail", value: 48.96, fill: "#B1E3FF" },
];

export default function PieChartWithPaddingAngle({ isAnimationActive = true }) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* Base Pie */}
        <Pie
          data={sampleSalesData}
          innerRadius="67%"
          outerRadius="100%"
        //   cornerRadius={20}
          dataKey="value"
          strokeWidth={5}
          isAnimationActive={isAnimationActive}
        >
          {sampleSalesData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Pie>

        
      </PieChart>
    </ResponsiveContainer>
  );
}
