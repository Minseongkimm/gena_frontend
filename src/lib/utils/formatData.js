// transform number for statistics box ex) 12345 -> 12,345
export function formatNumber(input) {
    const num = typeof input === 'number' ? input : Number(input);
    if (Number.isNaN(num)) return String(input);
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }