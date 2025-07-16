'use client';
import { useState } from "react";
import AddDashboardModal from "./AddDashboardModal";

export default function AddDashboardButton({ className = "", onDashboardCreated }) {
  const [isAddDashboardModalOpen, setIsAddDashboardModalOpen] = useState(false);  

  const handleOpenModal = () => {
    setIsAddDashboardModalOpen(true);
  };

  const handleDashboardCreated = (newDashboard) => {
    // if onDashboardCreated is provided, call it with the new dashboard
    onDashboardCreated?.(newDashboard);
    setIsAddDashboardModalOpen(false);
  };

  return (
    <>
      <button
        className={`px-4 py-2 bg-white text-black border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 font-medium text-sm hover:cursor-pointer ${className}`}
        onClick={handleOpenModal}
      >
        + New Dashboard
      </button>
    <>
      {isAddDashboardModalOpen ? <AddDashboardModal onClose={() => setIsAddDashboardModalOpen(false)} onSubmit={handleDashboardCreated} /> : "" }
    </>
    </>
  );
}