import { useEffect, useState } from "react";

export function useDashboard(id) {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    // fetch dashboard data from the API by dashboardId
    async function fetchDashboard() {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`http://localhost:4000/dashboards/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDashboard();
  }, [id]);

  return { dashboard, isLoading, error };
} 