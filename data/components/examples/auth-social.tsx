"use client";

import {
  AuthForm,
  AuthHeader,
  AuthField,
  AuthSubmit,
  AuthSeparator,
  AuthSocial,
} from "@/data/components/code/auth-form";

export default function SocialAuthPage() {
  const handleSocialAuth = (provider: string) => {
    // Redirect to OAuth provider
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <AuthForm>
      <AuthHeader />

      <div className="space-y-3">
        <AuthSocial
          provider="google"
          onClick={() => handleSocialAuth("google")}
        >
          Continue with Google
        </AuthSocial>

        <AuthSocial
          provider="github"
          onClick={() => handleSocialAuth("github")}
        >
          Continue with GitHub
        </AuthSocial>

        <AuthSocial
          provider="twitter"
          onClick={() => handleSocialAuth("twitter")}
        >
          Continue with X
        </AuthSocial>
      </div>

      <AuthSeparator text="or continue with email" />

      <AuthField name="email" label="Email" type="email" required />
      <AuthField name="password" label="Password" type="password" required />

      <AuthSubmit />
    </AuthForm>
  );
}
