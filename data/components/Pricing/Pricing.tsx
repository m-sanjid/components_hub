"use client";

import { forwardRef } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../Card/Card";
import { Button } from "../Button/Button";
import { IconCheck } from "@tabler/icons-react";
import clsx from "clsx";

export interface PricingProps {
  className?: string;
}

export const Pricing = forwardRef<HTMLDivElement, PricingProps>(
  ({ className }, ref) => {
    const plans = [
      {
        name: "Basic",
        price: "$9",
        description: "Perfect for getting started",
        features: [
          "10 projects",
          "5GB storage",
          "Basic support",
          "Email notifications",
        ],
        buttonText: "Get Started",
        popular: false,
      },
      {
        name: "Pro",
        price: "$29",
        description: "Best for professionals",
        features: [
          "Unlimited projects",
          "50GB storage",
          "Priority support",
          "Advanced analytics",
          "API access",
          "Custom domain",
        ],
        buttonText: "Get Started",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$99",
        description: "For large organizations",
        features: [
          "Unlimited everything",
          "Custom solutions",
          "24/7 support",
          "Dedicated account manager",
          "SLA guarantee",
          "Custom integrations",
        ],
        buttonText: "Contact Sales",
        popular: false,
      },
    ];

    return (
      <div ref={ref} className={clsx("space-y-6", className)}>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={clsx(
                "relative",
                plan.popular && "border-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <IconCheck className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "primary" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
);

Pricing.displayName = "Pricing"; 