"use client";

import {
  AuthForm,
  AuthHeader,
  AuthField,
  AuthSubmit,
  AuthLink,
} from "@/data/components/code/auth-form";

export default function AuthFormExample() {
  const handleLogin = async (data: Record<string, string>) => {
    // Handle login logic
    console.log("Login:", data);
  };

  return (
    <AuthForm onSubmit={handleLogin} mode="login">
      <AuthHeader
        title={{ login: "Welcome back", signup: "" }}
        subtitle={{ login: "Sign in to your account" }}
      />

      <AuthField name="email" label="Email" type="email" required />
      <AuthField name="password" label="Password" type="password" required />

      <div className="flex justify-end">
        <AuthLink href="/forgot-password">Forgot password?</AuthLink>
      </div>

      <AuthSubmit labels={{ login: "Sign In", signup: "" }} />
    </AuthForm>
  );
}
