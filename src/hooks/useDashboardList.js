import { useEffect, useState } from "react";

export function useDashboardsList(refreshTrigger = 0) {
  const [dashboards, setDashboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboards = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("http://localhost:4000/dashboards");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDashboards(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, [refreshTrigger]);

  return { dashboards, isLoading, error, refetch: fetchDashboards };
} 