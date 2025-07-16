import { HiOutlineChartBar } from "react-icons/hi";
import DashboardInfo from "./DashboardInfo";

export default function DashboardListCard({ dashboards, onDashboardClick }) {

  return (
    <div className="p-4 mx-4 lg:ml-7 lg:mr-0 bg-white rounded-sm shadow transition cursor-pointer flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="text-md text-[#1A2233]" />
          <h2 className="font-semibold text-lg lg:text-xl text-black">Dashboard</h2>
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