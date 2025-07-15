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

  return {
    createDashboard,
    isLoading,
    error
  };
} 