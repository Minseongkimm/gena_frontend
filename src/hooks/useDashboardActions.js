import { useState } from "react";

export function useDashboardActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createDashboard = async (dashboardData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:4000/dashboards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `dashboard-${Date.now()}`, // this could be uuid in production
          name: dashboardData.name,
          description: dashboardData.description,
          charts: []
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create dashboard: ${response.status}`);
      }

      const newDashboard = await response.json();
      return newDashboard;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createChart = async (chartData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const existingChartsResponse = await fetch(`http://localhost:4000/charts?dashboardId=${chartData.dashboardId}`);
      let nextOrder = 0;
      
      if (existingChartsResponse.ok) {
        const existingCharts = await existingChartsResponse.json();
        if (existingCharts.length > 0) {
          const maxOrder = Math.max(...existingCharts.map(chart => chart.order || 0));
          nextOrder = maxOrder + 1;
        }
      }

      const chartResponse = await fetch("http://localhost:4000/charts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `chart-${Date.now()}`,
          dashboardId: chartData.dashboardId,
          type: chartData.type,
          title: chartData.title,
          dataEndpoint: `/api/data/${chartData.dataEndpoint}`,
          order: nextOrder
        }),
      });

      if (!chartResponse.ok) {
        throw new Error(`Failed to create chart: ${chartResponse.status}`);
      }

      const newChart = await chartResponse.json();

      if (chartData.chartData) {
        const dataKey = chartData.dataEndpoint;
        
        const existingDataResponse = await fetch("http://localhost:4000/chartData");
        let existingData = {};
        
        if (existingDataResponse.ok) {
          existingData = await existingDataResponse.json();
        }
        
        const updatedData = {
          ...existingData,
          [dataKey]: chartData.chartData
        };
        
        const chartDataResponse = await fetch("http://localhost:4000/chartData", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!chartDataResponse.ok) {
          console.warn("Failed to save chart data:", chartDataResponse.status);
        }
      }

      return newChart;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createDashboard,
    createChart,
    isLoading,
    error
  };
} 