import React from "react";
import { AccordionGroup } from "../code/animated-accordion";

const AnimatedAccordionDemo = () => {
  return (
    <div>
      <AccordionGroup
        allowMultiple
        items={[
          {
            id: "features",
            title: "Features",
            content: (
              <AccordionGroup
                allowMultiple
                items={[
                  {
                    id: "animations",
                    title: "Animations",
                    content: "Smooth open/close with Framer Motion.",
                  },
                  {
                    id: "accessibility",
                    title: "Accessibility",
                    content: "ARIA roles and keyboard friendly.",
                  },
                ]}
              />
            ),
          },
          {
            id: "pricing",
            title: "Pricing",
            content: "Free to use for personal and commercial projects.",
          },
        ]}
      />
    </div>
  );
};

export default AnimatedAccordionDemo;
