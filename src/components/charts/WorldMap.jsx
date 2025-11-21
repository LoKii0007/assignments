import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";


const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "West North America (near Vancouver)", coordinates: [-123.12, 49.28] },
  { name: "East North America (near Florida)", coordinates: [-80.19, 25.76] },
  { name: "Southeast Asia (near Jakarta)", coordinates: [106.85, -6.21] },
  { name: "Australia (near Sydney)", coordinates: [151.21, -33.87] },
];


export default function WorldMap() {
  const { theme } = useAppContext();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
      className="overflow-hidden "
    >
      <ComposableMap
        projectionConfig={{
          scale: 170,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* ? World shapes */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: theme === THEMES.LIGHT ? "#D0DFEB" : "#677680",
                    outline: "none",
                    stroke: theme === THEMES.LIGHT ? "#F7F9FB" : "#282828",
                    strokeWidth: 2,
                  },
                  hover: { fill: "#A8C5DA", outline: "none" },
                  pressed: { fill: "#0F172A", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* ? Markers */}

        <defs>
          <filter
            id="markerShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#0000001A"
              floodOpacity="1"
            />
          </filter>
        </defs>

        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={6}
              fill={theme === THEMES.LIGHT ? "#1C1C1C" : "#C6C7F8"}
              stroke="#FFFFFF"
              strokeWidth={2}
              filter="url(#markerShadow)"
            />
            {/* <text
              textAnchor="middle"
              y={-10}
              style={{
                fontFamily: "system-ui, sans-serif",
                fill: theme === THEMES.LIGHT ? "#1C1C1C" : "#C6C7F8",
                fontSize: 10,
              }}
            >
              {name}
            </text> */}
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
