export default function DashboardInfo({ dashboard, onDashboardClick }) {
  
  const handleClick = () => {
    onDashboardClick(dashboard.id);
  };

  return (
    <div
      className="hover:bg-gray-50 cursor-pointer mt-3 border-b border-gray-100 pb-2"
      onClick={handleClick}
    >
      <div>
        <h2 className="text-sm text-black mb-1">{dashboard.name}</h2>
        <p className="text-gray-500 text-sm mb-1">{dashboard.description}</p>
      </div>
    </div>
  );
} 