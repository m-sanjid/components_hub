"use client";

import { Bell, Lock, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../code/tabs";
import React, { useState } from "react";

export default function TabsExample() {
  const [controlledValue, setControlledValue] = useState("profile");

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        Controlled Tabs
      </h2>
      <div className="rounded-xl border bg-white p-6 shadow-lg dark:bg-neutral-900">
        <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Current active tab: <strong>{controlledValue}</strong>
          </p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setControlledValue("profile")}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              Go to Profile
            </button>
            <button
              onClick={() => setControlledValue("security")}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              Go to Security
            </button>
          </div>
        </div>

        <Tabs
          defaultValue="profile"
          value={controlledValue}
          onValueChange={setControlledValue}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Information</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                This tab is controlled externally. You can switch tabs using the
                buttons above.
              </p>
              <div className="rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-white">
                <h4 className="font-semibold">Welcome to your profile!</h4>
                <p className="text-purple-100">
                  Manage your personal information here.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Settings</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">
                    Two-Factor Authentication
                  </h4>
                  <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                    Add an extra layer of security to your account.
                  </p>
                  <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                    Enable 2FA
                  </button>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Login Sessions</h4>
                  <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                    Manage your active login sessions.
                  </p>
                  <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                    Sign Out All
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Email Notifications",
                    desc: "Receive notifications via email",
                  },
                  {
                    title: "Push Notifications",
                    desc: "Get push notifications on your device",
                  },
                  {
                    title: "SMS Notifications",
                    desc: "Receive text message alerts",
                  },
                  {
                    title: "Marketing Emails",
                    desc: "Get updates about new features and promotions",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={i < 2}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-neutral-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
