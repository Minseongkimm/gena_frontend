import { useEffect, useState } from "react";

export function useDashboardCharts(dashboardId, refreshTrigger = 0) {
  const [charts, setCharts] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dashboardId) {
      setIsLoading(false);
      return;
    }

    async function fetchDashboardCharts() {
      setIsLoading(true);
      setError(null);
      
      try {
        const dashboardRes = await fetch(`http://localhost:4000/dashboards/${dashboardId}`);
        if (!dashboardRes.ok) {
          throw new Error(`Failed to fetch dashboard: ${dashboardRes.status}`);
        }
        const dashboard = await dashboardRes.json();

        const dashboardChartIds = dashboard.charts || [];

        const dashboardCharts = [];
        for (const chartId of dashboardChartIds) {
          const chartRes = await fetch(`http://localhost:4000/charts/${chartId}`);
          if (chartRes.ok) {
            const chart = await chartRes.json();
            dashboardCharts.push(chart);
          }
        }

        const chartDataRes = await fetch(`http://localhost:4000/chartData`);
        if (!chartDataRes.ok) {
          throw new Error(`Failed to fetch chart data: ${chartDataRes.status}`);
        }
        const allChartData = await chartDataRes.json();

        const chartsWithData = dashboardCharts.map((chart) => {
          const dataKey = chart.dataEndpoint.split('/').pop(); // "signups-by-region"
          const data = allChartData[dataKey];
          
          return {
            ...chart,
            data: data
          };
        });

        const sortedCharts = chartsWithData.sort((a, b) => (a.order || 0) - (b.order || 0));

        setCharts(sortedCharts);
        
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