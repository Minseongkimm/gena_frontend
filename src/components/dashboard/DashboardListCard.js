import { HiOutlineChartBar } from "react-icons/hi";
import DashboardInfo from "./DashboardInfo";

export default function DashboardListCard({ dashboards, onDashboardClick }) {
  console.log(dashboards);

  return (
    <div className="p-4 ml-7 bg-white rounded-sm shadow transition hover:bg-gray-50 cursor-pointer flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="text-md text-[#1A2233]" />
          <h2 className="font-semibold text-sm text-black">Dashboard</h2>
        </div>
      </div>
      <div>
        {dashboards.map(dashboard => (
          <DashboardInfo 
            key={dashboard.id} 
            dashboard={dashboard} 
            onDashboardClick={onDashboardClick}
          />
        ))}
      </div>
    </div>
  );
}