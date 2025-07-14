export default function DotsVerticalIcon({ size = 15, color = '#A3A8AF', className = '' }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 20 20" className={className}>
      <circle cx="10" cy="5" r="1" fill={color}/>
      <circle cx="10" cy="10" r="1" fill={color}/>
      <circle cx="10" cy="15" r="1" fill={color}/>
    </svg>
  );
} 