import { NextRequest } from "next/server";
import { sendEmail } from "@/lib/email";
import { newsletterSchema, isDisposableEmail } from "@/lib/validation";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // Check for disposable email addresses
    if (isDisposableEmail(email)) {
      return Response.json(
        {
          message: "Please use a valid email address",
          success: false,
        },
        { status: 400 },
      );
    }

    // Get client info for tracking
    const forwardedFor = request.headers.get("x-forwarded-for");
    const userAgent = request.headers.get("user-agent");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || "unknown";

    // ---------------- Subscriber Email ----------------
    let welcomeResult;
    try {
      welcomeResult = await sendEmail({
        to: email,
        subject: "Welcome to Components Hub Newsletter!",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Components Hub</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          
          <div style="padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
            <h1 style="margin-top: 0; color: #111827;">Welcome to Components Hub!</h1>
            <p style="margin-bottom: 16px;">Thank you for subscribing to our newsletter. 🎉</p>

            <h3 style="margin-bottom: 8px; color: #374151;">What to expect:</h3>
            <ul style="margin-top: 0; padding-left: 20px; color: #4b5563;">
              <li>Latest UI components and templates</li>
              <li>Helpful guides and tutorials</li>
              <li>Product updates and new features</li>
              <li>Tips and best practices</li>
            </ul>

            <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
              To unsubscribe, click <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #2563eb; text-decoration: none;">here</a>.
            </p>
          </div>

          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
            This email was sent automatically by Components Hub
          </p>

        </body>
        </html>
        `,
        text: `
        Welcome to Components Hub! 🎉

        Thanks for subscribing to our newsletter.

        What to expect:
        • Latest UI components and templates
        • Helpful guides and tutorials
        • Product updates and new features
        • Tips and best practices

        Unsubscribe: ${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}
        `,
      });
      console.log("Welcome email sent:", welcomeResult.messageId);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      throw new Error("Failed to send welcome email");
    }

    // ---------------- Admin Notification Email ----------------
    sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: "New Newsletter Subscription - Components Hub",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Newsletter Subscription</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        
        <div style="padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb;">
          <h2 style="margin-top: 0; color: #111827;">New Newsletter Subscription</h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 120px;">Email:</td>
              <td style="padding: 8px 0; font-family: monospace;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Subscribed:</td>
              <td style="padding: 8px 0;">${new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "long" })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">IP Address:</td>
              <td style="padding: 8px 0; font-family: monospace;">${ipAddress || "Unknown"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">User Agent:</td>
              <td style="padding: 8px 0; font-size: 12px; word-break: break-all; max-width: 300px;">${userAgent || "Unknown"}</td>
            </tr>
          </table>
        </div>

        <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
          This notification was sent automatically by Components Hub
        </p>

      </body>
      </html>
      `,
    })
      .then((result) =>
        console.log("Admin notification sent:", result.messageId),
      )
      .catch((error) =>
        console.error("Failed to send admin notification:", error),
      );

    // ---------------- Success Response ----------------
    return Response.json(
      {
        message:
          "Successfully subscribed to newsletter! Check your email for confirmation.",
        success: true,
        data: {
          email,
          subscribedAt: new Date().toISOString(),
          messageId: welcomeResult.messageId,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return Response.json(
        {
          message: "Please enter a valid email address",
          success: false,
          errors: (error as z.ZodError).issues,
        },
        { status: 400 },
      );
    }

    // Handle SMTP authentication errors
    if (error instanceof Error && error.message.includes("Invalid login")) {
      console.error("SMTP Authentication failed. Check your credentials.");
      return Response.json(
        {
          message:
            "Email service temporarily unavailable. Please try again later.",
          success: false,
        },
        { status: 503 },
      );
    }

    // Handle email sending errors
    if (
      error instanceof Error &&
      (error.message.includes("Failed to send") ||
        error.message.includes("SMTP"))
    ) {
      return Response.json(
        {
          message: "Unable to send confirmation email. Please try again.",
          success: false,
        },
        { status: 503 },
      );
    }

    // Handle database connection errors
    if (error instanceof Error && error.message.includes("database")) {
      console.error("Database error during subscription:", error);
      return Response.json(
        {
          message:
            "Subscription partially completed. Please contact support if you don't receive a confirmation email.",
          success: false,
        },
        { status: 500 },
      );
    }

    // Generic error
    return Response.json(
      {
        message: "Failed to subscribe. Please try again later.",
        success: false,
      },
      { status: 500 },
    );
  }
}

// ---------------- CORS OPTIONS ----------------
export async function OPTIONS() {
  return Response.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}
