export default function ChartDataInput({ labelInput, valueInput, onLabelChange, onValueChange, onAdd, isAddDisabled }) {
  return (
    <div className="flex gap-2 mb-2">
      <input
        className="w-full px-4 py-3 rounded-lg text-sm border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-black bg-gray-50 placeholder-gray-400"
        placeholder="Label (e.g., January, Product A)"
        value={labelInput}
        onChange={e => onLabelChange(e.target.value)}
      />
      <input
        className="w-32 px-4 py-3 rounded-lg text-sm border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-black bg-gray-50 placeholder-gray-400"
        placeholder="Value"
        value={valueInput}
        onChange={e => onValueChange(e.target.value)}
        type="number"
      />
      <button
        type="button"
        className="px-4 rounded-lg bg-gradient-to-r from-[#3DD6A6] to-[#5B7FFF] text-white font-bold text-xl flex items-center justify-center disabled:opacity-50"
        onClick={onAdd}
        disabled={isAddDisabled}
        tabIndex={-1}
      >
        +
      </button>
    </div>
  );
} 