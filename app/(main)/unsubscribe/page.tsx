"use client";

import { useState } from "react";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "Failed to unsubscribe.");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="bg-card w-full max-w-md rounded-2xl border p-6 shadow-md">
        <h1 className="mb-2 text-center text-xl font-semibold">Unsubscribe</h1>
        <p className="text-muted-foreground mb-4 text-center text-sm">
          Enter your email to unsubscribe from future emails.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-md border p-2"
        />

        <button
          onClick={handleUnsubscribe}
          disabled={loading || !email}
          className="bg-destructive w-full rounded-md py-2 text-white disabled:opacity-50"
        >
          {loading ? "Unsubscribing..." : "Unsubscribe"}
        </button>

        {message && (
          <p className="text-muted-foreground mt-3 text-center text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
