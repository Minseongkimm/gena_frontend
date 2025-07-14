export default function DashboardGridIcon({ size = 28, color = '#fff', className = '' }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 20 20" className={className}>
      <rect x="3" y="4" width="4" height="4" rx="1" fill={color} />
      <rect x="9" y="4" width="8" height="4" rx="1" fill={color} />
      <rect x="3" y="10" width="4" height="6" rx="1" fill={color} />
      <rect x="9" y="10" width="8" height="6" rx="1" fill={color} />
    </svg>
  );
} 