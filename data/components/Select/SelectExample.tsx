import React from "react";
import { Select } from "./Select";

const SelectExample = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Select options={options} placeholder="Select an option" />
      <Select
        options={options}
        label="With label"
        placeholder="Choose an option"
      />
      <Select
        options={options}
        label="With error"
        error="Please select an option"
      />
      <Select
        options={options}
        label="Disabled"
        disabled
        placeholder="Cannot select"
      />
    </div>
  );
};

export default SelectExample;


export const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4", disabled: true },
];
