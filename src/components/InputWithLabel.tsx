import React from "react";

interface InputWithLabelProps {
  label: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ label }) => (
  <div className="flex items-center my-1 ">
    <label className="w-[40%] text-gray-900">{label}</label>
    <input
      type="number"
      placeholder="Enter Points"
      className="border rounded-md px-2 py-2 w-[40%]"
    />
  </div>
);

export default InputWithLabel;
