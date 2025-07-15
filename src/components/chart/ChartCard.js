'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ChartBarIcon from "@/components/common/icons/ChartBarIcon";
import DotsVerticalIcon from "@/components/common/icons/DotsVerticalIcon";
import ChartSummary from "./ChartSummary";

const data = [
  { name: "asdasd", value: 100 },
  { name: "aghhh", value: 10 },
  { name: "hhh", value: 11222 },
];

export default function ChartCard() {
  return (
    <div className="bg-white rounded-sm shadow p-4 w-96 max-w-full">
      <div className="flex items-start justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3DD6A6] to-[#5B7FFF] flex items-center justify-center">
            <ChartBarIcon size={20} color="#fff" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#1A2233]">order amount</div>
            <div className="text-gray-400 text-[9px]">Bar Chart</div>
          </div>
        </div>
        <div className="mt-2 cursor-pointer">
          <DotsVerticalIcon size={15} color="#A3A8AF" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2.5 mb-6 mt-5">
        <ChartSummary title="Total" value={33332} />
        <ChartSummary title="Categories" value={3} />
        <ChartSummary title="Highest" value={11222} />
      </div>
      
      {/* // 차트 컴포넌트 3개로 나눌것 분기 */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#7B849B", fontSize: 11 }} />
            <YAxis tick={{ fill: "#7B849B", fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#5B7FFF" radius={[7, 7, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}