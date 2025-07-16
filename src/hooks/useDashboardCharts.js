import { useEffect, useState } from "react";

export function useDashboardCharts(dashboardId, refreshTrigger = 0) {
  const [charts, setCharts] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no dashboard ID, set loading to false and return
    if (!dashboardId) {
      setIsLoading(false);
      return;
    }

    async function fetchDashboardCharts() {
      setIsLoading(true);
      setError(null);
      
      try {
        // Step 1: Fetch dashboard information
        const dashboardRes = await fetch(`http://localhost:4000/dashboards/${dashboardId}`);
        if (!dashboardRes.ok) {
          throw new Error(`Failed to fetch dashboard: ${dashboardRes.status}`);
        }
        const dashboard = await dashboardRes.json();

        // Extract chart IDs linked to the dashboard (empty array if none)
        const dashboardChartIds = dashboard.charts || [];

        // Step 2: Fetch each chart's information
        const dashboardCharts = [];
        for (const chartId of dashboardChartIds) {
          const chartRes = await fetch(`http://localhost:4000/charts/${chartId}`);
          if (chartRes.ok) {
            const chart = await chartRes.json();
            dashboardCharts.push(chart);
          }
        }

        // Step 3: Fetch all chart data
        const chartDataRes = await fetch(`http://localhost:4000/chartData`);
        if (!chartDataRes.ok) {
          throw new Error(`Failed to fetch chart data: ${chartDataRes.status}`);
        }
        const allChartData = await chartDataRes.json();

        // Step 4: Combine chart information with data
        const chartsWithData = dashboardCharts.map((chart) => {
          // Extract data key from dataEndpoint (e.g., "/api/data/signups-by-region" → "signups-by-region")
          const dataKey = chart.dataEndpoint.split('/').pop();
          const data = allChartData[dataKey];
          
          return {
            ...chart,
            data: data
          };
        });

        // Step 5: Sort charts by order (ascending order based on order field)
        const sortedCharts = chartsWithData.sort((a, b) => (a.order || 0) - (b.order || 0));

        setCharts(sortedCharts);
        
        // Step 6: Convert chart data to key-value format for storage
        const dataObject = {};
        sortedCharts.forEach(chart => {
          const dataKey = chart.dataEndpoint.split('/').pop();
          dataObject[dataKey] = chart.data;
        });
        setChartData(dataObject);

      } catch (error) {
        console.error("Failed to fetch dashboard charts:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDashboardCharts();
  }, [dashboardId, refreshTrigger]);

  return { charts, chartData, isLoading, error };
} 