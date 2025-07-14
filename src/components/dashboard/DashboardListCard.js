import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineChartBar } from "react-icons/hi";

export default function DashboardListCard({ dashboard, onClick }) {
  return (
    <div
      className="p-4 ml-7 bg-white rounded-sm shadow transition hover:bg-gray-50 cursor-pointer flex flex-col gap-2"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="text-md text-[#1A2233]" />
          <h2 className="font-semibold text-sm text-black">Dashboard</h2>
        </div>
      </div>

    <div
      className="hover:bg-gray-50 cursor-pointer mt-3 border-b border-gray-100 pb-3"
      onClick={onClick}
    >
      <h2 className="text-[11px] text-black mb-1">Dashboard1</h2>
      <p className="text-gray-500 text-[11px] mb-1">description1</p>
      <p className="text-gray-500 text-[11px]">2024-01-01</p>
    </div>

    </div>
  );
}