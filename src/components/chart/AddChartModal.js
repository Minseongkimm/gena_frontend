import useAddChartForm from "./useAddChartForm";
import ChartTypeSelector from "./ChartTypeSelector";
import ChartDataInput from "./ChartDataInput";
import ChartDataList from "./ChartDataList";
import ChartTypeIcon from "@/components/common/icons/ChartTypeIcon";

const CHART_TYPES = [
  { key: "bar", label: "Bar Chart" },
  { key: "line", label: "Line Chart" },
  { key: "number", label: "Number Chart" },
];

export default function AddChartModal({ onClose, onSubmit }) {
  const form = useAddChartForm();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8 relative animate-fadeIn">
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3DD6A6] to-[#5B7FFF] flex items-center justify-center">
            <ChartTypeIcon type={form.chartType} size={28} color="#fff" />
          </div>
          <h2 className="font-bold text-lg text-[#1A2233]">Create New Chart</h2>
        </div>
        <ChartTypeSelector chartType={form.chartType} setChartType={form.setChartType} chartTypes={CHART_TYPES} />
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!form.isSubmitDisabled) {
              onSubmit?.({ title: form.title, data: form.data, chartType: form.chartType });
            }
          }}
        >
          <label className="block font-semibold text-gray-900 mb-2 text-sm" htmlFor="chart-title">
            Chart Title
          </label>
          <input
            id="chart-title"
            className="w-full mb-6 px-4 py-3 text-sm rounded-lg border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-black bg-gray-50 placeholder-gray-400"
            placeholder="ex) Monthly Sales, User Growth"
            value={form.title}
            onChange={e => form.setTitle(e.target.value)}
            required
          />
          <label className="block font-semibold text-gray-900 mb-2 text-sm">Data</label>
          <ChartDataInput
            labelInput={form.labelInput}
            valueInput={form.valueInput}
            onLabelChange={form.setLabelInput}
            onValueChange={form.setValueInput}
            onAdd={form.handleAddData}
            isAddDisabled={form.isAddDisabled}
          />
          <ChartDataList data={form.data} onRemove={form.handleRemoveData} />
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="cursor-pointer px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3DD6A6] to-[#5B7FFF] flex items-center gap-2 disabled:opacity-50"
              disabled={form.isSubmitDisabled}
            >
              <ChartTypeIcon type={form.chartType} size={20} color="#fff" />
              Create Chart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}