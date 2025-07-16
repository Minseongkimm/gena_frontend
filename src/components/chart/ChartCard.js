'use client';
import { useState } from "react";
import DotsVerticalIcon from "@/components/common/icons/DotsVerticalIcon";
import ChartTypeIcon from "@/components/common/icons/ChartTypeIcon";
import ChartComponent from "./ChartComponent";
import NumberChartComponent from "./NumberChartComponent";
import ChartStats from "./ChartStats";
import EditChartModal from "./EditChartModal";

export default function ChartCard({ chartType = "bar", data, title, chart, onChartUpdated }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const calculateStats = () => {
    if (chartType === "number") {
      // For number charts, return single value
      return {
        total: data?.value || 0,
        categories: 1,
        highest: data?.value || 0
      };
    }
    
    if (data?.values && Array.isArray(data.values)) {
      // For bar/line charts, calculate from values array
      const values = data.values;
      return {
        total: values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0),
        categories: values.length,
        highest: Math.max(...values.map(val => parseFloat(val) || 0))
      };
    }
    
    // Default values when no data is available
    return {
      total: 0,
      categories: 0,
      highest: 0
    };
  };

  const stats = calculateStats();

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleChartUpdated = (updatedChart) => {
    onChartUpdated?.(updatedChart);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-sm shadow p-4 w-full">
        <div className="flex items-start justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3DD6A6] to-[#5B7FFF] flex items-center justify-center">
              <ChartTypeIcon type={chartType} size={20} color="#fff" />
            </div>
            <div>
              <div className="font-bold text-base text-[#1A2233]">{title}</div>
              <div className="text-gray-400 text-xs">
                {chartType === "line" ? "Line Chart" : chartType === "number" ? "Number" : "Bar Chart"}
              </div>
            </div>
          </div>
          <div className="mt-2 cursor-pointer" onClick={handleEditClick}>
            <DotsVerticalIcon size={15} color="#A3A8AF" />
          </div>
        </div>
        
        {/* Chart statistics (only for bar/line charts, not for number charts) */}
        {chartType !== "number" && <ChartStats stats={stats} />}
        
        {/* Chart visualization area */}
        <div className="w-full h-64">
          {chartType === "number" ? (
            <NumberChartComponent data={data} title={title} />
          ) : (
            <ChartComponent type={chartType} data={data} />
          )}
        </div>
      </div>

      {showEditModal && (
        <EditChartModal
          onClose={handleEditClose}
          onSubmit={handleChartUpdated}
          chart={chart}
          chartData={data}
        />
      )}
    </>
  );
}