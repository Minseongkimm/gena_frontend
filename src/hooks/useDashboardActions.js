import { useState } from "react";

export function useDashboardActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createDashboard = async (dashboardData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // create a new dashboard
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
      // Step 1: Get existing charts to determine next order
      const existingChartsResponse = await fetch(`http://localhost:4000/charts?dashboardId=${chartData.dashboardId}`);
      let nextOrder = 0;
      
      if (existingChartsResponse.ok) {
        const existingCharts = await existingChartsResponse.json();
        if (existingCharts.length > 0) {
          // Find the highest order and increment by 1
          const maxOrder = Math.max(...existingCharts.map(chart => chart.order || 0));
          nextOrder = maxOrder + 1;
        }
      }

      // Step 2: Create the chart
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

      // Step 3: Update dashboard to include the new chart
      const dashboardResponse = await fetch(`http://localhost:4000/dashboards/${chartData.dashboardId}`);
      if (dashboardResponse.ok) {
        const dashboard = await dashboardResponse.json();
        // Add new chart ID to dashboard's charts array
        const updatedCharts = [...(dashboard.charts || []), newChart.id];
        
        await fetch(`http://localhost:4000/dashboards/${chartData.dashboardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dashboard,
            charts: updatedCharts
          }),
        });
      }

      // Step 4: Save chart data if provided
      if (chartData.chartData) {
        const dataKey = chartData.dataEndpoint;
        
        // Get existing chart data
        const existingDataResponse = await fetch("http://localhost:4000/chartData");
        let existingData = {};
        
        if (existingDataResponse.ok) {
          existingData = await existingDataResponse.json();
        }
        
        // Merge new chart data with existing data
        const updatedData = {
          ...existingData,
          [dataKey]: chartData.chartData
        };
        
        // Save updated chart data
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

  const updateChart = async (chartData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Step 1: Update chart information
      const chartResponse = await fetch(`http://localhost:4000/charts/${chartData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: chartData.id,
          dashboardId: chartData.dashboardId,
          type: chartData.type,
          title: chartData.title,
          dataEndpoint: `/api/data/${chartData.dataEndpoint}`,
          order: chartData.order || 0 // Preserve or set order
        }),
      });

      if (!chartResponse.ok) {
        throw new Error(`Failed to update chart: ${chartResponse.status}`);
      }

      const updatedChart = await chartResponse.json();

      // Step 2: Update chart data if provided
      if (chartData.chartData) {
        const dataKey = chartData.dataEndpoint;
        
        // Get existing chart data
        const existingDataResponse = await fetch("http://localhost:4000/chartData");
        let existingData = {};
        
        if (existingDataResponse.ok) {
          existingData = await existingDataResponse.json();
        }
        
        // Merge updated chart data with existing data
        const updatedData = {
          ...existingData,
          [dataKey]: chartData.chartData
        };
        
        // Save updated chart data
        const chartDataResponse = await fetch("http://localhost:4000/chartData", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!chartDataResponse.ok) {
          console.warn("Failed to update chart data:", chartDataResponse.status);
        }
      }

      return updatedChart;
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
    updateChart,
    isLoading,
    error
  };
} 