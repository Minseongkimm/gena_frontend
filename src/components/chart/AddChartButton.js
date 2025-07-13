export default function AddChartButton({ onClick, className = "" }) {
  return (
    <button
      className={`px-3 py-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white text-xs rounded hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      + Add Chart
    </button>
  );
}