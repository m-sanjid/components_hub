import { sendEmail } from "@/lib/email";
import { getUnsubscribeConfirmationTemplate } from "@/lib/email-templates";
import { NextRequest } from "next/server";
import { z } from "zod";

const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = unsubscribeSchema.parse(body);

    const unsubscribeEmailOptions = getUnsubscribeConfirmationTemplate(email);
    await sendEmail({
      ...unsubscribeEmailOptions,
      to: email,
    });

    console.log("User unsubscribed:", email);

    return Response.json(
      {
        message: "Successfully unsubscribed from newsletter",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: "Invalid email address",
          success: false,
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        message: "Failed to unsubscribe. Please try again.",
        success: false,
      },
      { status: 500 },
    );
  }
}

// Handle GET requests for email link unsubscribe
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return Response.redirect(new URL("/?error=missing-email", request.url));
  }

  try {
    // Validate email
    unsubscribeSchema.parse({ email });

    // Optional: Update database
    // await unsubscribeUser(email);

    console.log("User unsubscribed via link:", email);

    // Redirect to confirmation page
    return Response.redirect(
      new URL(
        `/unsubscribe-success?email=${encodeURIComponent(email)}`,
        request.url,
      ),
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return Response.redirect(new URL("/?error=invalid-email", request.url));
  }
}
