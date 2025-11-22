import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { THEMES } from "@/utils/constants";
import { describeArc, polarToCartesian } from "@/utils/helpers";  

const DonutChart = ({
  data = [],
  thickness = 17,
  borderWidth = 4,
  hoverOffset = 5,
  borderColor = "white",
}) => {
  // --- 1. Responsive Logic ---
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { theme } = useAppContext();

  useEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.disconnect();
  }, []);

  // ? Determine the square size based on the smallest dimension of the parent
  const size = Math.min(dimensions.width, dimensions.height);

  // ? Chart State ---
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // ? Data Processing ---
  const chartData = useMemo(() => {
    if (size <= 0) return [];

    const center = size / 2;
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);

    // Important: We keep the "radius" of the path CONSTANT.
    // We only change the "stroke-width" to grow the sector.
    // This prevents the arc from jumping position during transition.
    // We subtract the max possible thickness/2 so it never clips.
    const maxThickness = thickness + hoverOffset;
    const midRadius = size / 2 - maxThickness / 2;

    let currentAngle = 0;

    return data.map((item, index) => {
      const angle = (item.value / totalValue) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;

      return {
        ...item,
        index,
        startAngle,
        endAngle,
        center,
        midRadius, // This is constant for all sectors
      };
    });
  }, [data, size, thickness, hoverOffset]);

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  // ? Helper for consistent transition styles
  const transitionStyle = {
    transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)", // Smooth easing
  };

  if (size === 0)
    return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;

  return (
    <>
      {/* Container takes 100% of parent */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: "visible", display: "block", margin: "0 auto" }}
        >
          {/* LAYER 1: Main Arcs */}
          {chartData.map((segment) => {
            const isHovered = hoveredIndex === segment.index;
            const currentThickness = isHovered
              ? thickness + hoverOffset
              : thickness;

            return (
              <path
                key={`arc-${segment.index}`}
                d={describeArc(
                  segment.center,
                  segment.center,
                  segment.midRadius,
                  segment.startAngle,
                  segment.endAngle
                )}
                fill="none"
                stroke={
                  theme === THEMES.LIGHT ? segment.fill : segment.darkFill
                }
                strokeWidth={currentThickness}
                onMouseEnter={() => setHoveredIndex(segment.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseMove={handleMouseMove}
                style={{
                  ...transitionStyle,
                  cursor: "pointer",
                }}
              />
            );
          })}

          {/* LAYER 2: Connector Caps */}
          {chartData.map((segment) => {
            const isHovered = hoveredIndex === segment.index;
            // Calculate dynamic sizes based on hover state
            const currentThickness = isHovered
              ? thickness + hoverOffset
              : thickness;
            const capRadius = currentThickness / 2;
            const borderPathRadius = capRadius + borderWidth / 2;

            // Calculate center point (End of sector)
            const capCenter = polarToCartesian(
              segment.center,
              segment.center,
              segment.midRadius,
              segment.endAngle
            );

            // Calculate Border Arc Points
            const borderInnerPoint = polarToCartesian(
              segment.center,
              segment.center,
              segment.midRadius - borderPathRadius,
              segment.endAngle
            );

            const borderOuterPoint = polarToCartesian(
              segment.center,
              segment.center,
              segment.midRadius + borderPathRadius,
              segment.endAngle
            );

            return (
              <g
                key={`cap-group-${segment.index}`}
                style={{ pointerEvents: "none" }} // Pass clicks through to the arc
              >
                {/* A. Fill Circle (The Connector) */}
                <circle
                  cx={capCenter.x}
                  cy={capCenter.y}
                  r={capRadius}
                  fill={
                    theme === THEMES.LIGHT ? segment.fill : segment.darkFill
                  }
                  style={{ ...transitionStyle }}
                />

                {/* B. White Border Arc */}
                <path
                  d={`
                    M ${borderInnerPoint.x} ${borderInnerPoint.y}
                    A ${borderPathRadius} ${borderPathRadius} 0 0 0 ${borderOuterPoint.x} ${borderOuterPoint.y}
                  `}
                  fill="none"
                  stroke={borderColor}
                  strokeWidth={borderWidth}
                  strokeLinecap="round"
                  // Note: 'd' transition support varies by browser, but since
                  // we transition the circle and stroke-width, it looks cohesive.
                  style={{ ...transitionStyle }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* TOOLTIP */}
      {hoveredIndex !== null && chartData[hoveredIndex] && (() => {
        const totalValue = data.reduce((acc, item) => acc + item.value, 0);
        const percent = ((chartData[hoveredIndex].value / totalValue) * 100).toFixed(1);
        
        return (
          <div
            style={{
              position: "fixed",
              left: tooltipPos.x + 15,
              top: tooltipPos.y + 15,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <div className="px-2 py-1 rounded-[8px] bg-[#1C1C1CCC]">
              <p className="text-xs text-white font-[Inter]">
                {percent}%
              </p>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default React.memo(DonutChart);
