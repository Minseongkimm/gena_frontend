export const dashboards = [
  {
    id: "dashboard-1",
    name: "Marketing KPIs",
    charts: ["chart-1", "chart-2", "chart-3"]
  }
];

export const charts = [
  {
    id: "chart-1",
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Signups by Region",
    dataEndpoint: "/api/data/signups-by-region",
    order: 0
  },
  {
    id: "chart-2",
    dashboardId: "dashboard-1", 
    type: "line",
    title: "Orders Over Time",
    dataEndpoint: "/api/data/orders-over-time",
    order: 1
  },
  {
    id: "chart-3",
    dashboardId: "dashboard-1",
    type: "number",
    title: "Total Revenue",
    dataEndpoint: "/api/data/total-revenue",
    order: 2
  }
];

export const chartData = {
  "signups-by-region": {
    labels: ["North America", "Europe", "Asia"],
    values: [120, 95, 180]
  },
  "orders-over-time": {
    labels: ["2025-07-01", "2025-07-02", "2025-07-03", "2025-07-04", "2025-07-05"],
    values: [32, 45, 41, 58, 67]
  },
  "total-revenue": {
    value: 98123
  }
}; 