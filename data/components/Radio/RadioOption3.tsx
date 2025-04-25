"use client"

import React from "react";
import { Radio } from "./Radio";

const RadioOption3 = () => {
  return (
    <div className="flex flex-col gap-4">
      <Radio value="option1" label="Option 1" />
      <Radio
        value="option2"
        label="Option 2"
        onChange={(value) => console.log(value)}
      />
      <Radio value="option3" label="Option 3" checked />
    </div>
  );
};

export default RadioOption3;
