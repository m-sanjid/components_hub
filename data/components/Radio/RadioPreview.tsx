import React from "react";
import { Radio } from "./Radio";

const RadioPreview = () => {
  return (
    <div className="flex flex-col gap-4">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" checked />
      <Radio
        value="option3"
        label="With error"
        error="This field is required"
      />
      <Radio value="option4" label="Disabled" disabled />
    </div>
  );
};

export default RadioPreview;
