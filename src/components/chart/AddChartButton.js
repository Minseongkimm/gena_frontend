'use client';

import { useState } from "react";
import AddChartModal from "./AddChartModal";

export default function AddChartButton({ onClick, className = "" }) {
  const [isAddChartModalOpen, setIsAddChartModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsAddChartModalOpen(true);
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
      {isAddChartModalOpen ? <AddChartModal onClose={() => setIsAddChartModalOpen(false)} /> : "" }
    </>
   </>
  );
}