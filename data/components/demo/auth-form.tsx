"use client";

import {
  AuthForm,
  AuthHeader,
  AuthField,
  AuthSubmit,
  AuthToggleLink,
  AuthSeparator,
  AuthSocial,
} from "@/data/components/code/auth-form";
import { IconMail, IconLock, IconUser } from "@tabler/icons-react";

export default function AuthPage() {
  const handleSubmit = async (
    data: Record<string, string>,
    mode: "login" | "signup",
  ) => {
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Handle successful authentication
      localStorage.setItem("token", result.token);
      window.location.href = "/dashboard";
    } else {
      // Handle errors
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
      <AuthForm onSubmit={handleSubmit}>
        <AuthHeader />

        <AuthField
          name="name"
          label="Full Name"
          icon={<IconUser className="h-4 w-4" />}
          showOnlyFor="signup"
          required
        />

        <AuthField
          name="email"
          label="Email"
          type="email"
          icon={<IconMail className="h-4 w-4" />}
          required
        />

        <AuthField
          name="password"
          label="Password"
          validate={(value) => {
            if (!value) return "Password is required";
            if (value.length < 8)
              return "Password must be at least 8 characters long";
            return null;
          }}
          type="password"
          icon={<IconLock className="h-4 w-4" />}
          showPasswordToggle
          required
        />

        <AuthSubmit />

        <AuthSeparator />

        <AuthSocial
          provider="google"
          onClick={() => console.log("Google auth")}
        >
          Continue with Google
        </AuthSocial>

        <AuthSocial
          provider="github"
          onClick={() => console.log("GitHub auth")}
        >
          Continue with GitHub
        </AuthSocial>

        <AuthToggleLink />
      </AuthForm>
    </div>
  );
}
