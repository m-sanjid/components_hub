export const getWelcomeEmailTemplate = (email: string) => ({
  subject: "Welcome to Components Hub Newsletter!",
  html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Components Hub</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <!-- Your beautiful email template here -->
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

export const getUnsubscribeConfirmationTemplate = (email: string) => ({
  subject: "You've been unsubscribed - Components Hub",
  html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>You've been unsubscribed</h2>
        <p>We've successfully removed ${email} from our newsletter.</p>
        <p>We're sorry to see you go! If you change your mind, you can always subscribe again.</p>
      </body>
      </html>
    `,
});

export const getAdminNotificationTemplate = (
  email: string,
  ipAddress?: string,
  userAgent?: string | null,
) => {
  return {
    subject: "📧 New Newsletter Subscription - Components Hub",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Newsletter Subscription</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; border-left: 4px solid #10b981; margin-bottom: 20px;">
          <h2 style="color: #1e293b; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
            📧 New Newsletter Subscription
          </h2>
          
          <div style="background: white; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937; font-family: monospace; background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Subscribed:</td>
                <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString(
                  "en-US",
                  {
                    timeZone: "UTC",
                    dateStyle: "full",
                    timeStyle: "long",
                  },
                )}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">IP Address:</td>
                <td style="padding: 8px 0; color: #6b7280; font-family: monospace;">${ipAddress || "Unknown"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; vertical-align: top;">User Agent:</td>
                <td style="padding: 8px 0; color: #6b7280; font-size: 12px; word-break: break-all; max-width: 300px;">${userAgent || "Unknown"}</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="color: #92400e; margin: 0 0 8px 0; font-size: 14px;">📊 Quick Actions</h3>
          <p style="margin: 0; font-size: 13px; color: #78350f;">
            • View all subscribers in your admin dashboard<br>
            • Send a welcome campaign to new subscribers<br>
            • Check subscriber engagement metrics
          </p>
        </div>

        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This notification was sent automatically by Components Hub
          </p>
        </div>
      </body>
      </html>
    `,
  };
};
