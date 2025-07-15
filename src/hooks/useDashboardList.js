import { useEffect, useState } from "react";

export function useDashboardsList() {
  const [dashboards, setDashboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboards() {
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
    }
    
    fetchDashboards();
  }, []);

  return { dashboards, isLoading, error };
} 