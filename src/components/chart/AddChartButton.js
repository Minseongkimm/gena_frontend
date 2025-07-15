'use client';

import { useState } from "react";
import AddChartModal from "./AddChartModal";

export default function AddChartButton({ className = "", selectedDashboardId, onChartCreated }) {
  const [isAddChartModalOpen, setIsAddChartModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!selectedDashboardId) {
      alert("Please select a dashboard first");
      return;
    }
    setIsAddChartModalOpen(true);
  };

  const handleChartCreated = (newChart) => {
    onChartCreated?.(newChart);
    setIsAddChartModalOpen(false);
  };

  return (
    <>
      <button
        className={`px-3 py-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white text-xs rounded hover:cursor-pointer ${className}`}
        onClick={handleOpenModal}
      >
        + Add Chart
      </button>
      <>
      {isAddChartModalOpen ? (
        <AddChartModal 
          onClose={() => setIsAddChartModalOpen(false)} 
          onSubmit={handleChartCreated}
          dashboardId={selectedDashboardId}
        />
      ) : "" }
    </>
   </>
  );
}