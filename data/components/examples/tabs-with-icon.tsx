import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../code/tabs";
import { User, Settings, CreditCard, HelpCircle } from "lucide-react";

const TabsWithIcon = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        Tabs with Icons
      </h2>
      <div className="rounded-xl border bg-white p-6 dark:bg-neutral-900">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="help">
              <HelpCircle className="h-4 w-4" />
              Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Software Developer
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Appearance</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="theme" value="light" />
                    <span>Light theme</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="theme" value="dark" />
                    <span>Dark theme</span>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Privacy</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Show profile publicly</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Allow search indexing</span>
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Current Plan: Pro</h4>
                <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">
                  Active
                </span>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                <p className="font-semibold">$29/month</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Next billing: Jan 15, 2025
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="help" className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Frequently Asked Questions</h4>
              <div className="space-y-3">
                <details className="rounded-lg border p-3">
                  <summary className="cursor-pointer font-medium">
                    How do I change my password?
                  </summary>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    Go to the Password tab to update your credentials.
                  </p>
                </details>
                <details className="rounded-lg border p-3">
                  <summary className="cursor-pointer font-medium">
                    How do I cancel my subscription?
                  </summary>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    Visit the Billing tab to manage your subscription.
                  </p>
                </details>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsWithIcon;
