import { formatNumber } from "@/lib/utils/formatData";

export default function ChartSummary({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-lg py-1.5 flex flex-col items-center">
      <div className="text-gray-400 text-xs lg:text-[14px] mb-1">{title}</div>
      <div className="font-bold text-sm lg:text-lg text-black">
        {formatNumber(value)}
      </div>
    </div>
  );
}
