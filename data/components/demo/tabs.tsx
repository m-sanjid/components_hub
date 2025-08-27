import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../code/tabs";

const TabsDemo = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-muted-foreground text-2xl font-semibold">
        Basic Tabs
      </h2>
      <div className="rounded-xl border bg-white p-6 dark:bg-neutral-900">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Account Settings</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage your account details and preferences here.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  className="w-full rounded-md border p-2"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full rounded-md border p-2"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="password" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Password Settings</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Update your password and security settings.
            </p>
            <div className="max-w-md space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <input
                  type="password"
                  className="w-full rounded-md border p-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Configure how you want to be notified.
            </p>
            <div className="space-y-3">
              {[
                "Email notifications",
                "Push notifications",
                "SMS notifications",
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsDemo;
