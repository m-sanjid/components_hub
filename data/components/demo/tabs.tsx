import React from "react";
import { Tabs } from "../code/tabs";
import SocialShareDemo from "./social-share";
import AnimatedButtonDemo from "./animated-button";
import AnimatedAccordionDemo from "./animated-accordion";

const TabsDemo = () => {
  const tabs = [
    {
      value: "tab1",
      label: "Accordion",
      content: <AnimatedAccordionDemo />,
    },
    {
      value: "tab2",
      label: "Social Share",
      content: <SocialShareDemo />,
    },
    {
      value: "tab3",
      label: "Button",
      content: <AnimatedButtonDemo />,
    },
  ];
  return <Tabs tabs={tabs} />;
};

export default TabsDemo;
