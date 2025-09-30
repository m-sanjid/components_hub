import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get parameters from URL
    const title = searchParams.get("title") || "Velnor UI";
    const description =
      searchParams.get("description") ||
      "A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.";
    const type = searchParams.get("type") || "default";
    const theme = searchParams.get("theme") || "light";

    // Theme colors
    const isDark = theme === "dark";
    const bgColor = isDark ? "#09090b" : "#ffffff";
    const textColor = isDark ? "#fafafa" : "#0a0a0a";
    const mutedColor = isDark ? "#a1a1aa" : "#525252";
    const accentColor = "#FF6100";
    const cardBg = isDark ? "#262626" : "#f5f5f5";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
            backgroundImage: isDark
              ? "linear-gradient(45deg, rgba(255, 97, 0, 0.1) 0%, rgba(255, 97, 0, 0.05) 100%)"
              : "linear-gradient(45deg, rgba(255, 97, 0, 0.05) 0%, rgba(255, 97, 0, 0.02) 100%)",
            fontFamily: "Inter, system-ui, sans-serif",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: isDark
                ? "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)"
                : "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.3,
            }}
          />

          {/* Floating Orbs */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "10%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: accentColor,
              opacity: 0.1,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "10%",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              backgroundColor: accentColor,
              opacity: 0.08,
              filter: "blur(50px)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "900px",
              padding: "60px 40px",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "12px",
                  backgroundColor: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "20px",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                C
              </div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: textColor,
                }}
              >
                Velnor UI
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: type === "component" ? "48px" : "56px",
                fontWeight: "bold",
                color: textColor,
                lineHeight: 1.1,
                marginBottom: "24px",
                maxWidth: "800px",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "24px",
                color: mutedColor,
                lineHeight: 1.4,
                marginBottom: "40px",
                maxWidth: "700px",
              }}
            >
              {description}
            </div>

            {/* Type-specific content */}
            {type === "component" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: cardBg,
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: `1px solid ${isDark ? "#404040" : "#e5e5e5"}`,
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginRight: "12px",
                  }}
                />
                <span
                  style={{
                    fontSize: "18px",
                    color: textColor,
                    fontWeight: "500",
                  }}
                >
                  React Component
                </span>
              </div>
            )}

            {type === "template" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: cardBg,
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: `1px solid ${isDark ? "#404040" : "#e5e5e5"}`,
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginRight: "12px",
                  }}
                />
                <span
                  style={{
                    fontSize: "18px",
                    color: textColor,
                    fontWeight: "500",
                  }}
                >
                  Starter Template
                </span>
              </div>
            )}
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}80 50%, ${accentColor} 100%)`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: Error | unknown) {
    console.log(
      `OG Error: ${e instanceof Error ? e.message : "Unknown error"}`,
    );
    return new Response(
      `Failed to generate the image: ${e instanceof Error ? e.message : "Unknown error"}`,
      {
        status: 500,
      },
    );
  }
}
