import React, { useState } from "react";
import RightSidebar from "../../RightSidebar";
import HeaderNavbar from "../common/HeaderNavbar";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("default");

  return (
    <div className="flex h-screen bg-white w-full">
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <HeaderNavbar />
        <DashboardContent />
      </div>

    </div>
  );
};

export default Dashboard;
