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
  const { charts, isLoading } = useDashboardCharts(selectedDashboardId, refreshTrigger);

  const handleDashboardId = (dashboardId) => {
    setSelectedDashboardId(dashboardId);
  };

  const handleDashboardCreated = (newDashboard) => {
    setRefreshTrigger(prev => prev + 1);
    setSelectedDashboardId(newDashboard.id);
  };

  const handleChartChange = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <div className="flex flex-col mt-0 md:mt-1 md:flex-row md:justify-between md:items-center px-4 md:px-8 py-5 bg-[#f7fafd] gap-4">
        <HeaderTitle selectedDashboard={selectedDashboard}/>
        <div className="flex justify-end w-full gap-3 md:gap-5">
          <AddDashboardButton className="w-1/2 md:w-auto" onDashboardCreated={handleDashboardCreated} />
          <AddChartButton 
            className="w-1/2 md:w-auto" 
            selectedDashboardId={selectedDashboardId}
            onChartCreated={handleChartChange}
          />
        </div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:mt-6">
        <div className="lg:col-span-1 mb-6 lg:mb-0">
          <DashboardListCard 
            dashboards={dashboards}
            onDashboardClick={handleDashboardId}
          />
        </div>
        <div className="lg:col-span-3">
          {isLoading ? (
            // when loading
            <div className="flex items-center justify-center p-8">
              <p>Loading charts...</p>
            </div>
          ) : charts && charts.length > 0 ? (
            // when charts are loaded
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-4 md:px-7">
              {charts.map(chart => (
                <ChartCard 
                  key={chart.id}
                  chart={chart}
                  chartType={chart.type}
                  data={chart.data}
                  title={chart.title}
                  onChartUpdated={handleChartChange}
                />
              ))}
            </div>
          ) : (
            // when charts are not loaded
            <div className="px-4 md:px-7">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
}
