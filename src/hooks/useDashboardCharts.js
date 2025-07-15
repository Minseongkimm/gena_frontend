import { useEffect, useState } from "react";

export function useDashboardCharts(dashboardId) {
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

        const chartsRes = await fetch(`http://localhost:4000/charts?dashboardId=${dashboardId}`);
        if (!chartsRes.ok) {
          throw new Error(`Failed to fetch charts: ${chartsRes.status}`);
        }
        const charts = await chartsRes.json();

        const chartDataRes = await fetch(`http://localhost:4000/chartData`);
        if (!chartDataRes.ok) {
          throw new Error(`Failed to fetch chart data: ${chartDataRes.status}`);
        }
        const allChartData = await chartDataRes.json();

        const chartsWithData = charts.map((chart) => {
          const dataKey = chart.dataEndpoint.split('/').pop(); // "signups-by-region"
          const data = allChartData[dataKey];
          
          return {
            ...chart,
            data: data
          };
        });

        setCharts(chartsWithData);
        
        const dataObject = {};
        chartsWithData.forEach(chart => {
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
  }, [dashboardId]);

  return { charts, chartData, isLoading, error };
} 