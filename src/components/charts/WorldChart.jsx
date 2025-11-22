import React from "react";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";
import { topology } from "@/utils/topology";

const markersData = [
  {
    name: "West North America (near Vancouver)",
    pop_est: 10,
    lat: 49.28,
    lon: -123.12,
  },
  {
    name: "East North America (near Florida)",
    pop_est: 10,
    lat: 25.76,
    lon: -80.19,
  },
  {
    name: "Southeast Asia (near Jakarta)",
    pop_est: 10,
    lat: -6.21,
    lon: 106.85,
  },
  {
    name: "Australia (near Sydney)",
    pop_est: 10,
    lat: -33.87,
    lon: 151.21,
  },
];

const WorldChart = () => {
  const { theme } = useAppContext();

  const options = {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    topology,
    background: {
      fill: "transparent",
    },
    series: [
      {
        type: "map-shape-background",
        topology,
        fill: theme === THEMES.LIGHT ? "#D0DFEB" : "#677680",
        stroke: theme === THEMES.LIGHT ? "#F7F9FB" : "#282828",
        strokeWidth: 1,
      },
      {
        type: "map-marker",
        latitudeKey: "lat",
        longitudeKey: "lon",
        idKey: "name",
        labelKey: "name",
        data: markersData,
        shape: "circle",
        size: 4, 
        fill: theme === THEMES.LIGHT ? "#1C1C1C" : "#C6C7F8",
        stroke: "#FFFFFF",
        strokeWidth: 1,
        shadow: {
          enabled: true,
          blur: 6,
        },

        showInLegend: false,
      },
    ],
  };

  return <AgCharts options={options} />;
};

export default React.memo(WorldChart);
