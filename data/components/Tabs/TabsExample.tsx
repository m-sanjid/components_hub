import React from "react";
import { Tabs } from "./Tabs";

const TabsExample = () => {
  return <Tabs tabs={tabs} />;
};

export default TabsExample;

export const tabs = [
  {
    value: "tab1",
    label: "Tab 1",
    content: <p>Content for tab 1</p>,
  },
  {
    value: "tab2",
    label: "Tab 2",
    content: <p>Content for tab 2</p>,
  },
  {
    value: "tab3",
    label: "Tab 3",
    content: <p>Content for tab 3</p>,
  },
];
