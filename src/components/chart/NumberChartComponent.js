export default function NumberChartComponent({ data, title }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="text-3xl font-bold text-[#1A2233]">
          {data?.value?.toLocaleString() || '0'}
        </div>
        <div className="text-sm text-gray-500 mt-2">{title}</div>
      </div>
    </div>
  );
} 