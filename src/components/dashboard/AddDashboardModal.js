import { useState } from "react";
import DashboardGridIcon from "@/components/common/icons/DashboardGridIcon";
import { useDashboardActions } from "@/hooks/useDashboardActions";

export default function AddDashboardModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createDashboard, isLoading, error } = useDashboardActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const newDashboard = await createDashboard({ name, description });
      onSubmit?.(newDashboard); 
      onClose();
    } catch (err) {
      console.error("Failed to create dashboard:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-fadeIn">
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-8 ">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3DD6A6] to-[#5B7FFF] flex items-center justify-center">
            <DashboardGridIcon size={28} color="#fff" />
          </div>
          <h2 className="font-bold text-base text-[#1A2233]">Create New Dashboard</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block font-semibold text-gray-900 mb-2 text-sm" htmlFor="dashboard-name">
            Dashboard Name
          </label>
          <input
            id="dashboard-name"
            className="w-full mb-6 px-4 py-3 rounded-sm border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-base bg-gray-50 placeholder-gray-400 text-xs text-black"
            placeholder="ex) Sales Analytics, Marketing Dashboard"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label className="block font-semibold text-gray-900 mb-2 text-sm" htmlFor="dashboard-desc">
            Description
          </label>
          <textarea
            id="dashboard-desc"
            className="w-full mb-8 px-4 py-3 rounded-sm border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-base bg-gray-50 placeholder-gray-400 text-xs text-black resize-none min-h-[80px]"
            placeholder="Describe what this dashboard will track..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3DD6A6] to-[#5B7FFF] flex items-center gap-2 disabled:opacity-50 text-sm"
              disabled={!name.trim() || isLoading}
            >
              <DashboardGridIcon size={20} color="#fff" />
              {isLoading ? "Creating..." : "Create Dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}