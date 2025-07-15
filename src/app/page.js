"use client";
import { useState } from "react";
import AddChartButton from "@/components/chart/AddChartButton";
import ChartCard from "@/components/chart/ChartCard";
import HeaderTitle from "@/components/common/HeaderTitle";
import AddDashboardButton from "@/components/dashboard/AddDashboardButton";
import DashboardListCard from "@/components/dashboard/DashboardListCard";
import EmptyState from "@/components/common/EmptyState";
import { useDashboardsList } from "@/hooks/useDashboardList";
import { useDashboard } from "@/hooks/useDashboard";
import { useDashboardCharts } from "@/hooks/useDashboardCharts";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { dashboards } = useDashboardsList(refreshTrigger);
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);
  const { dashboard: selectedDashboard } = useDashboard(selectedDashboardId);
  const { charts, isLoading } = useDashboardCharts(selectedDashboardId);

  const handleDashboardId = (dashboardId) => {
    setSelectedDashboardId(dashboardId);
  };

  const handleDashboardCreated = (newDashboard) => {
    setRefreshTrigger(prev => prev + 1);
    setSelectedDashboardId(newDashboard.id);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 py-5 bg-[#f7fafd] gap-4">
        <HeaderTitle selectedDashboard={selectedDashboard}/>
        <div className="flex justify-end w-full gap-5">
          <AddDashboardButton className="w-1/2 md:w-auto" onDashboardCreated={handleDashboardCreated} />
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
          {isLoading ? (
            <div className="col-span-2 flex items-center justify-center">
              <p>Loading charts...</p>
            </div>
          ) : charts && charts.length > 0 ? (
            charts.map(chart => (
              <ChartCard 
                key={chart.id}
                chartType={chart.type}
                data={chart.data}
                title={chart.title}
              />
            ))
                    ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
}
