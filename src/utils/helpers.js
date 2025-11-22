export function getRoundedMax(value) {
  const digits = value.toString().length;
  const roundTo = Math.pow(10, digits - 1);
  return Math.ceil(value / roundTo) * roundTo;
}

export const getStatusTextColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#8A8CD9";
    case "Complete":
      return "#4AA785";
    case "Pending":
      return "#59A8D4";
    case "Approved":
      return "#FFC555";
    case "Rejected":
      return "#1C1C1C66";
  }
};

export const getStatusDarkTextColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#8A8CD9";
    case "Complete":
      return "#4AA785";
    case "Pending":
      return "#59A8D4";
    case "Approved":
      return "#FFC555";
    case "Rejected":
      return "#FFFFFF66";
  }
};

export const getStatusBgColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#95A4FC";
    case "Complete":
      return "#A1E3CB";
    case "Pending":
      return "#B1E3FF";
    case "Approved":
      return "#FFE999";
    case "Rejected":
      return "#1C1C1C66";
  }
};

export const getStatusDarkBgColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#95A4FC";
    case "Complete":
      return "#A1E3CB";
    case "Pending":
      return "#B1E3FF";
    case "Approved":
      return "#FFE999";
    case "Rejected":
      return "#FFFFFF66";
  }
};

// ? Helper: Create SVG Path for the main Donut Arcs
export const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    end.x,
    end.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    start.x,
    start.y,
  ].join(" ");
};

// ? Helper: Convert polar coordinates to Cartesian

export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
