export default function ChartDataList({ data, onRemove }) {
  return (
    <div className="mb-8">
      {data.map((d, dataIndex) => (
        <div key={dataIndex} className="flex items-center px-2 py-1 gap-4">
          <span className="text-xs text-black">{d.label}</span>
          <span className="text-xs text-black font-bold">{d.value}</span>
          <button
            type="button"
            className="ml-2 text-xs text-blue-600 hover:text-red-500"
            onClick={() => onRemove(dataIndex)}
          >×</button>
        </div>
      ))}
    </div>
  );
} 