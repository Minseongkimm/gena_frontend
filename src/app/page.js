"use client";
import { useState } from "react";
import AddChartButton from "@/components/chart/AddChartButton";
import ChartCard from "@/components/chart/ChartCard";
import HeaderTitle from "@/components/common/HeaderTitle";
import AddDashboardButton from "@/components/dashboard/AddDashboardButton";
import DashboardListCard from "@/components/dashboard/DashboardListCard";
import { useDashboardsList } from "@/hooks/useDashboardList";
import { useDashboard } from "@/hooks/useDashboard";

export default function Home() {
  const { dashboards } = useDashboardsList();
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);
  const { dashboard: selectedDashboard } = useDashboard(selectedDashboardId);

  const handleDashboardId = (dashboardId) => {
    setSelectedDashboardId(dashboardId);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 py-5 bg-[#f7fafd] gap-4">
        <HeaderTitle selectedDashboard={selectedDashboard}/>
        <div className="flex justify-end w-full gap-5">
          <AddDashboardButton className="w-1/2 md:w-auto" />
          <AddChartButton className="w-1/2 md:w-auto" />
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <DashboardListCard 
            dashboards={dashboards}
            onDashboardClick={handleDashboardId}
          />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-5 mr-7 ml-7">
        {/* map */}
          <ChartCard />
          <ChartCard />
        </div>
      </div>
    </div>
  );
}
