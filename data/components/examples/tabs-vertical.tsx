import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../code/tabs";

const TabsVertical = () => {
  return (
    <section className="w-full space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        Vertical Tabs
      </h2>
      <div className="rounded-xl border bg-white p-6 dark:bg-neutral-900">
        <Tabs
          orientation="vertical"
          defaultValue="dashboard"
          className="w-full"
        >
          <TabsList className="h-fit">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <div className="min-h-[300px] flex-1">
            <TabsContent
              value="dashboard"
              className="h-full rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800"
            >
              <h3 className="mb-4 text-xl font-semibold">Dashboard Overview</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { title: "Total Users", value: "2,543", change: "+12%" },
                  { title: "Revenue", value: "$45,231", change: "+8%" },
                  { title: "Orders", value: "1,234", change: "+23%" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white p-4 shadow dark:bg-neutral-900"
                  >
                    <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {stat.title}
                    </h4>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-sm text-green-600">
                      {stat.change}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="analytics"
              className="h-full rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800"
            >
              <h3 className="mb-4 text-xl font-semibold">Analytics Data</h3>
              <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 font-semibold text-white">
                Chart Visualization Area
              </div>
            </TabsContent>

            <TabsContent
              value="reports"
              className="h-full rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800"
            >
              <h3 className="mb-4 text-xl font-semibold">Generated Reports</h3>
              <div className="space-y-3">
                {[
                  "Monthly Sales Report",
                  "User Activity Report",
                  "Performance Metrics",
                ].map((report, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded border bg-white p-3 dark:bg-neutral-900"
                  >
                    <span>{report}</span>
                    <button className="font-medium text-blue-600 hover:text-blue-800">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="team"
              className="h-full rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800"
            >
              <h3 className="mb-4 text-xl font-semibold">Team Members</h3>
              <div className="space-y-3">
                {[
                  { name: "Alice Johnson", role: "Designer", status: "Online" },
                  { name: "Bob Smith", role: "Developer", status: "Away" },
                  { name: "Carol White", role: "Manager", status: "Offline" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded border bg-white p-3 dark:bg-neutral-900"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-neutral-300"></div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-neutral-500">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        member.status === "Online"
                          ? "bg-green-100 text-green-800"
                          : member.status === "Away"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-neutral-100 text-neutral-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsVertical;
