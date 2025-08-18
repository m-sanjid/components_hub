import React from "react";
import { Tabs } from "../code/tabs";
import { AccordionExample } from "./animated-accordion";
import SocialShareDemo from "./social-share";
import AnimatedButtonDemo from "./animated-button";

const TabsDemo = () => {
  const tabs = [
    {
      value: "tab1",
      label: "Animated Accordion",
      content: <AccordionExample />,
    },
    {
      value: "tab2",
      label: "Social Share",
      content: <SocialShareDemo />,
    },
    {
      value: "tab3",
      label: "Animated Button",
      content: <AnimatedButtonDemo />,
    },
  ];
  return <Tabs tabs={tabs} />;
};

export default TabsDemo;

const TabsContent = ({ number }: { number: number }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold">Tab {number}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        This is content for tab {number}
      </p>
    </div>
  );
};
