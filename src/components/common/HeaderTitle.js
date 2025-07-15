export default function HeaderTitle({ selectedDashboard }) {
  console.log('header', selectedDashboard);

  if (!selectedDashboard) {
    return (
      <div className="min-w-[300px]">
        <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Dashboard</h1>
        <p className="text-xs text-gray-500">Select a dashboard to view details</p>
      </div>
    );
  }

  return (
    <div className="min-w-[300px]">
      <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{selectedDashboard.name}</h1>
      <p className="text-xs text-gray-500">{selectedDashboard.description}</p>
    </div>
  );
}