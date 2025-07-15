'use client';
import DotsVerticalIcon from "@/components/common/icons/DotsVerticalIcon";
import ChartTypeIcon from "@/components/common/icons/ChartTypeIcon";
import ChartComponent from "./ChartComponent";
import NumberChartComponent from "./NumberChartComponent";
import ChartStats from "./ChartStats";

export default function ChartCard({ chartType = "bar", data, title}) {

  const calculateStats = () => {
    if (chartType === "number") {
      return {
        total: data?.value || 0,
        categories: 1,
        highest: data?.value || 0
      };
    }
    if (data?.values) {
      const values = data.values;
      return {
        total: values.reduce((sum, val) => sum + val, 0),
        categories: values.length,
        highest: Math.max(...values)
      };
    }
    return {
      total: 0,
      categories: 0,
      highest: 0
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-sm shadow p-4 w-96 max-w-full">
      <div className="flex items-start justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3DD6A6] to-[#5B7FFF] flex items-center justify-center">
            <ChartTypeIcon type={chartType} size={20} color="#fff" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#1A2233]">{title}</div>
            <div className="text-gray-400 text-[9px]">{chartType === "line" ? "Line Chart" : chartType === "number" ? "Number" : "Bar Chart"}</div>
          </div>
        </div>
        <div className="mt-2 cursor-pointer">
          <DotsVerticalIcon size={15} color="#A3A8AF" />
        </div>
      </div>
      
      {chartType !== "number" && <ChartStats stats={stats} />}
      
      <div className="w-full h-56">
        {chartType === "number" ? (
          <NumberChartComponent data={data} title={title} />
        ) : (
          <ChartComponent type={chartType} data={data} />
        )}
      </div>
    </div>
  );
}