import ChartTypeIcon from "./icons/ChartTypeIcon";

export default function EmptyState({ 
  title = "No Charts Yet", 
  description = "Start creating beautiful visualizations by adding your first chart.",
  iconType = "line" 
}) {
  return (
    <div className="col-span-2 flex w-full">
      <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-sm shadow-sm w-full">
        <div className="w-20 h-20 lg:w-32 lg:h-28 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChartTypeIcon type={iconType} size={44} color="#6B7280" />
        </div>
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm lg:text-base">{description}</p>
      </div>
    </div>
  );
} 