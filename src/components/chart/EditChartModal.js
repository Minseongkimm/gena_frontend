import { useState, useEffect } from "react";
import ChartTypeSelector from "./ChartTypeSelector";
import ChartDataInput from "./ChartDataInput";
import ChartDataList from "./ChartDataList";
import ChartTypeIcon from "@/components/common/icons/ChartTypeIcon";
import { useDashboardActions } from "@/hooks/useDashboardActions";

const CHART_TYPES = [
  { key: "bar", label: "Bar Chart" },
  { key: "line", label: "Line Chart" },
  { key: "number", label: "Number" },
];

export default function EditChartModal({ onClose, onSubmit, chart, chartData }) {
  const [form, setForm] = useState({
    title: "",
    chartType: "bar",
    valueInput: "",
    labelInput: "",
    data: []
  });
  const { updateChart, isLoading, error } = useDashboardActions();

  useEffect(() => {
    if (chart && chartData) {
      setForm({
        title: chart.title,
        chartType: chart.type,
        valueInput: chart.type === "number" ? (chartData.value || "").toString() : "",
        labelInput: "",
        data: chart.type !== "number" && chartData.labels ? 
          chartData.labels.map((label, index) => ({
            label,
            value: (chartData.values[index] || 0).toString()
          })) : []
      });
    }
  }, [chart, chartData]);

  const handleAddData = () => {
    if (form.labelInput.trim() && form.valueInput.trim()) {
      setForm(prev => ({
        ...prev,
        data: [...prev.data, { label: prev.labelInput, value: prev.valueInput }],
        labelInput: "",
        valueInput: ""
      }));
    }
  };

  const handleRemoveData = (index) => {
    setForm(prev => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== index)
    }));
  };

  const isAddDisabled = !form.labelInput.trim() || !form.valueInput.trim();
  const isSubmitDisabled = !form.title.trim() || 
    (form.chartType === "number" ? !form.valueInput.trim() : form.data.length === 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    try {
      let chartDataToSave = {};
      
      if (form.chartType === "number") {
        chartDataToSave = { value: parseFloat(form.valueInput) || 0 };
      } else {
        const labels = form.data.map(item => item.label);
        const values = form.data.map(item => parseFloat(item.value) || 0);
        chartDataToSave = { labels, values };
      }

      const updatedChartData = {
        id: chart.id,
        dashboardId: chart.dashboardId,
        type: form.chartType,
        title: form.title,
        dataEndpoint: `${form.title.toLowerCase().replace(/\s+/g, '-')}`,
        order: chart.order || 0,
        chartData: chartDataToSave
      };

      const updatedChart = await updateChart(updatedChartData);
      onSubmit?.(updatedChart);
    } catch (err) {
      console.error("Failed to update chart:", err);
    }
  };

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
          <h2 className="font-semibold text-lg text-[#1A2233]">Edit Chart</h2>
        </div>
        <ChartTypeSelector 
          chartType={form.chartType} 
          setChartType={(type) => setForm(prev => ({ ...prev, chartType: type }))} 
          chartTypes={CHART_TYPES} 
        />
        <form onSubmit={handleSubmit}>
          <label className="block font-semibold text-gray-900 mb-2 text-sm" htmlFor="chart-title">
            Chart Title
          </label>
          <input
            id="chart-title"
            className="w-full mb-6 px-4 py-3 text-sm rounded-lg border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-black bg-gray-50 placeholder-gray-400"
            placeholder="ex) Monthly Sales, User Growth"
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          {form.chartType === "number" ? (
            <>
              <label className="block font-semibold text-gray-900 mb-2 text-sm">Value</label>
              <input
                type="number"
                className="w-full mb-6 px-4 py-3 text-sm rounded-lg border border-gray-200 focus:border-[#5B7FFF] focus:outline-none text-black bg-gray-50 placeholder-gray-400"
                placeholder="Enter a numeric value"
                value={form.valueInput}
                onChange={e => setForm(prev => ({ ...prev, valueInput: e.target.value }))}
                required
              />
            </>
          ) : (
            <>
              <label className="block font-semibold text-gray-900 mb-2 text-sm">Data</label>
              <ChartDataInput
                labelInput={form.labelInput}
                valueInput={form.valueInput}
                onLabelChange={(value) => setForm(prev => ({ ...prev, labelInput: value }))}
                onValueChange={(value) => setForm(prev => ({ ...prev, valueInput: value }))}
                onAdd={handleAddData}
                isAddDisabled={isAddDisabled}
              />
              <ChartDataList data={form.data} onRemove={handleRemoveData} />
            </>
          )}
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
              disabled={isSubmitDisabled || isLoading}
            >
              <ChartTypeIcon type={form.chartType} size={20} color="#fff" />
              {isLoading ? "Updating..." : "Update Chart"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 