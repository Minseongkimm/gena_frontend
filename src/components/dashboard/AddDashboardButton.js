export default function AddDashboardButton({ onClick, className = "" }) {
  return (
    <button
      className={`px-3 py-1 bg-white text-black border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 font-medium text-xs hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      + New Dashboard
    </button>
  );
}