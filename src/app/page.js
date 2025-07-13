import AddChartButton from "@/components/chart/AddChartButton";
import AddDashboardButton from "@/components/dashboard/AddDashboardButton";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-8 py-5 bg-[#f7fafd] gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900">sibal</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">description</p>
        </div>
        <div className="flex justify-end w-full gap-5">
          <AddDashboardButton className="w-1/2 md:w-auto" />
          <AddChartButton className="w-1/2 md:w-auto" />
        </div>
      </div>
    </div>
  );
}
