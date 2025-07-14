export default function ChartTypeSelector({ chartType, setChartType, chartTypes }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {chartTypes.map(type => (
        <button
          key={type.key}
          type="button"
          className={`cursor-pointer px-3 py-1 rounded-lg font-semibold text-sm border transition-all ${chartType === type.key ? 'bg-[#eaf1ff] text-[#3777FF] border-gray-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
          onClick={() => setChartType(type.key)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
} 