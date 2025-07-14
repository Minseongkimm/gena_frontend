export default function ChartTypeIcon({ type = 'bar', size = 20, color = '#fff', className = '' }) {
  if (type === 'bar') {
    return (
      <svg width={size} height={size} fill="none" viewBox="0 0 20 20" className={className}>
        <rect x="3" y="10" width="3" height="7" rx="1" fill={color}/>
        <rect x="8.5" y="6" width="3" height="11" rx="1" fill={color}/>
        <rect x="15" y="2" width="3" height="15" rx="1" fill={color}/>
      </svg>
    );
  }
  if (type === 'line') {
    return (
      <svg width={size} height={size} fill="none" viewBox="0 0 20 20" className={className}>
        <polyline points="2,16 7,10 13,14 18,4" stroke={color} strokeWidth="2" fill="none" />
      </svg>
    );
  }
  if (type === 'number') {
    return (
      <svg width={size} height={size} fill="none" viewBox="0 0 20 20" className={className}>
        <text x="10" y="15" textAnchor="middle" fontSize="12" fill={color}>#</text>
      </svg>
    );
  }
  return null;
} 