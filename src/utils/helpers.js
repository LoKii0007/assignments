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