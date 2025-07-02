import { Card, CardContent, CardHeader } from "@/data/components/Card/Card";
import { Checkbox } from "@/data/components/Checkbox/Checkbox";
import { Input } from "@/data/components/Input/Input";
import { ProgressStepsExample } from "@/data/components/ProgressSteps/ProgressStepsExamples";
import { Select } from "@/data/components/Select/Select";
import { Settings } from "@/data/components/Settings/Settings";
import { Tabs } from "@/data/components/Tabs/Tabs";
import { UserProfile } from "@/data/components/UserProfile/UserProfile";
import { IconMail, IconSearch } from "@tabler/icons-react";
import React from "react";

const TestPage = () => {
  return (
    <div>
      TestPage
      {/* <div className="grid grid-cols-3">
        <Card hoverable>
          <CardHeader title="Default Card" description="With hover effect" />
          <CardContent>
            <p>This is a basic card with hover animation.</p>
          </CardContent>
        </Card>
        <Card variant="outline" clickable>
          <CardHeader
            title="Outline Card"
            description="Clickable with animation"
          />
          <CardContent>
            <p>This card has an outline style and is clickable.</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <Checkbox label="Basic checkbox" />
          <Checkbox label="Checked by default" checked />
          <Checkbox label="With error" error="This field is required" />
          <Checkbox label="Disabled" disabled />
        </div>
      </div>
      <div className="flex w-full max-w-md flex-col gap-4">
        <Input placeholder="Basic input" />
        <Input label="With label" placeholder="Enter text" />
        <Input
          label="With icons"
          placeholder="Search..."
          leftIcon={<IconSearch size={16} />}
        />
        <Input
          label="With error"
          placeholder="Enter email"
          error="Please enter a valid email"
          leftIcon={<IconMail size={16} />}
        />
        <div>
          <Tabs tabs={tabs} />
        </div>
        <div>
          <div className="flex w-full max-w-md flex-col gap-4">
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
        </div>
        <div>
          <UserProfile />
          <Settings />
        </div>
      </div> */}
      <ProgressStepsExample />
    </div>
  );
};

export default TestPage;

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4", disabled: true },
];

const tabs = [
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
