import AddChartButton from "@/components/chart/AddChartButton";
import ChartCard from "@/components/chart/ChartCard";
import HeaderTitle from "@/components/common/HeaderTitle";
import AddDashboardButton from "@/components/dashboard/AddDashboardButton";
import DashboardListCard from "@/components/dashboard/DashboardListCard";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 py-5 bg-[#f7fafd] gap-4">
        <HeaderTitle />
        <div className="flex justify-end w-full gap-5">
          <AddDashboardButton className="w-1/2 md:w-auto" />
          <AddChartButton className="w-1/2 md:w-auto" />
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <DashboardListCard />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-5 mr-7 ml-7">
          <ChartCard />
          <ChartCard />
        </div>
      </div>
    </div>
  );
}
