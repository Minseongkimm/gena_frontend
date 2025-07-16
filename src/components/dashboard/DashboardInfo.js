export default function DashboardInfo({ dashboard, onDashboardClick }) {
  
  const handleClick = () => {
    onDashboardClick(dashboard.id);
  };

  return (
    <div
      className="hover:bg-gray-50 cursor-pointer mt-4 border-b border-gray-100 pb-2"
      onClick={handleClick}
    >
      <div>
        <h2 className="text-sm lg:text-base text-black mb-1">{dashboard.name}</h2>
        <p className="text-gray-500 text-sm lg:text-base mb-1">{dashboard.description}</p>
      </div>
    </div>
  );
} 