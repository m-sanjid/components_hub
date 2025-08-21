import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create a reusable singleton transporter
let transporter: nodemailer.Transporter | null = null;

export const createTransporter = () => {
  if (transporter) return transporter;

  // Validate required environment variables
  const requiredEnvVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "FROM_EMAIL"];
  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    logger: process.env.NODE_ENV !== "production", // log in dev
    debug: process.env.NODE_ENV !== "production", // debug in dev
    tls: {
      rejectUnauthorized: process.env.SMTP_SECURE === "true", // safer default
    },
  });

  return transporter;
};

export const sendEmail = async (options: EmailOptions) => {
  const transporter = createTransporter();

  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(options.to)}`;

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: `
      ${options.html}
      <br/><br/>
      <p style="font-size:12px;color:#666;text-align:center;">
        If you no longer want to receive these emails, 
        <a href="${unsubscribeUrl}">unsubscribe here</a>.
      </p>
    `,
    text: `${options.text || ""}\n\nUnsubscribe: ${unsubscribeUrl}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
