"use client";

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

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ComplexTabsExample = () => {
  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold">Project Overview</h3>
              <p className="text-muted-foreground mt-2">
                This is a brief overview of the project. It includes key metrics
                and important information.
              </p>
            </div>
          </Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <div className="p-6">
                <h4 className="text-sm font-medium">Total Users</h4>
                <p className="mt-2 text-2xl font-bold">1,234</p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h4 className="text-sm font-medium">Active Users</h4>
                <p className="mt-2 text-2xl font-bold">567</p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <h4 className="text-sm font-medium">Conversion Rate</h4>
                <p className="mt-2 text-2xl font-bold">45%</p>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    {
      value: "settings",
      label: "Settings",
      content: (
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold">Project Settings</h3>
              <p className="text-muted-foreground mt-2">
                Configure your project settings here.
              </p>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <input
                    type="text"
                    className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      value: "team",
      label: "Team",
      content: (
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <Button>Add Member</Button>
              </div>
              <div className="mt-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-muted h-10 w-10 rounded-full" />
                      <div>
                        <p className="font-medium">Team Member {i}</p>
                        <p className="text-muted-foreground text-sm">
                          team.member{i}@example.com
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Remove</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
};

import { useState } from "react";

export const TabsWithOnChangeExample = () => {
  const [activeTab, setActiveTab] = useState("tab1");

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

  return (
    <div className="space-y-4">
      <Tabs
        tabs={tabs}
        defaultValue={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          console.log("Active tab:", value);
        }}
      />
      <p className="text-muted-foreground text-sm">Active tab: {activeTab}</p>
    </div>
  );
};
