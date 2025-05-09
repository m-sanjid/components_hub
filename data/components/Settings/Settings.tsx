"use client";

import { forwardRef } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../Card/Card";
import { Button } from "../Button/Button";
import { Tabs } from "../Tabs/Tabs";
import { IconBell, IconLock, IconUser, IconMail, IconShield } from "@tabler/icons-react";
import clsx from "clsx";

export interface SettingsProps {
  className?: string;
}

export const Settings = forwardRef<HTMLDivElement, SettingsProps>(
  ({ className }, ref) => {
    const tabs = [
      {
        value: "account",
        label: "Account",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Account Settings" />
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter your email"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter your username"
                      defaultValue="johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter your bio"
                      rows={3}
                      defaultValue="Software engineer passionate about building great products."
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        ),
      },
      {
        value: "security",
        label: "Security",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Security Settings" />
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Change your password
                      </p>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your active sessions
                      </p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ),
      },
      {
        value: "notifications",
        label: "Notifications",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Notification Settings" />
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS notifications
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ),
      },
    ];

    return (
      <div ref={ref} className={clsx("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button variant="outline">Reset to Default</Button>
        </div>
        <Tabs tabs={tabs} />
      </div>
    );
  }
);

Settings.displayName = "Settings"; 