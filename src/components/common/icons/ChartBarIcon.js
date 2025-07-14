export default function ChartBarIcon({ size = 20, color = '#1A2233', className = '' }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 20 20" className={className}>
      <path d="M4 12l3-3 4 4 5-7" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
} 