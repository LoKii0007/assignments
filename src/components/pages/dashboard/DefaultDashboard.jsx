import React from "react";
import HeaderNavbar from "../common/HeaderNavbar";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <HeaderNavbar />
        <DashboardContent />
      </div>

    </div>
  );
};

export default React.memo(Dashboard);
