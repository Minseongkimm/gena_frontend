import { useState } from "react";

export default function useAddChartForm(initialChartType = "bar") {
  const [title, setTitle] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState(initialChartType);

  const handleAddData = () => {
    // if the label and value are not empty and the value is a number, add the data
    if (labelInput.trim() && valueInput.trim() && !isNaN(Number(valueInput))) {
      setData([...data, { label: labelInput.trim(), value: Number(valueInput) }]);
      setLabelInput("");
      setValueInput("");
    }
  };

  const handleRemoveData = (dataIndex) => {
    setData(data.filter((_, currentIndex) => currentIndex !== dataIndex));
  };

  // if data is not empty, the form is disabled
  const isAddDisabled = !labelInput.trim() || !valueInput.trim() || isNaN(Number(valueInput));
  const isSubmitDisabled = !title.trim() || (chartType === "number" ? !valueInput.trim() : data.length === 0);

  return {
    title, setTitle,
    labelInput, setLabelInput,
    valueInput, setValueInput,
    data, handleAddData, handleRemoveData,
    chartType, setChartType,
    isAddDisabled, isSubmitDisabled
  };
} 