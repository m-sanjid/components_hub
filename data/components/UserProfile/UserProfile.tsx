"use client";

import { forwardRef } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../Card/Card";
import {
  IconEdit,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBuilding,
} from "@tabler/icons-react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button/Button";
import { Tabs } from "../Tabs/Tabs";

export interface UserProfileProps {
  className?: string;
}

export const UserProfile = forwardRef<HTMLDivElement, UserProfileProps>(
  ({ className }, ref) => {
    const tabs = [
      {
        value: "overview",
        label: "Overview",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Personal Information" />
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-muted" />
                    <div>
                      <h3 className="text-xl font-semibold">John Doe</h3>
                      <p className="text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <IconMail className="h-4 w-4 text-muted-foreground" />
                      <p>john.doe@example.com</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconPhone className="h-4 w-4 text-muted-foreground" />
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconMapPin className="h-4 w-4 text-muted-foreground" />
                      <p>San Francisco, CA</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconBuilding className="h-4 w-4 text-muted-foreground" />
                      <p>Tech Corp Inc.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  leftIcon={<IconEdit className="h-4 w-4" />}
                >
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader title="Skills" />
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Node.js",
                    "GraphQL",
                    "AWS",
                    "Docker",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ),
      },
      {
        value: "activity",
        label: "Activity",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Recent Activity" />
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border p-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconEdit className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Updated profile information
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i} day{i !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ),
      },
      {
        value: "projects",
        label: "Projects",
        content: (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Recent Projects" />
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-medium">Project {i}</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  ))}
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
          <h1 className="text-3xl font-bold">User Profile</h1>
          <Button>Export Profile</Button>
        </div>
        <Tabs tabs={tabs} />
      </div>
    );
  }
);

UserProfile.displayName = "UserProfile";
