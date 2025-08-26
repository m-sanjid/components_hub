"use client";

import {
  AuthForm,
  AuthField,
  AuthSubmit,
} from "@/data/components/code/auth-form";

export default function SignupWithValidation() {
  const validatePassword = (value: string): string | null => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "Password must contain uppercase, lowercase, and number";
    }
    return null;
  };

  const validateEmail = (value: string): string | null => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  return (
    <AuthForm mode="signup">
      <AuthField
        name="email"
        label="Email"
        type="email"
        validate={validateEmail}
        required
      />

      <AuthField
        name="password"
        label="Password"
        type="password"
        validate={validatePassword}
        showPasswordToggle
        required
      />

      <AuthSubmit />
    </AuthForm>
  );
}
