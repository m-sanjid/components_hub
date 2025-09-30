import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Template";
    const description =
      searchParams.get("description") || "A beautiful starter template";
    const category = searchParams.get("category") || "Starter";
    const theme = searchParams.get("theme") || "light";

    // Theme colors
    const isDark = theme === "dark";
    const bgColor = isDark ? "#09090b" : "#ffffff";
    const textColor = isDark ? "#fafafa" : "#0a0a0a";
    const mutedColor = isDark ? "#a1a1aa" : "#525252";
    const accentColor = "#FF6100";

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
            fontFamily: "Inter, system-ui, sans-serif",
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
                ? "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)"
                : "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              opacity: 0.4,
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
                T
              </div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: textColor,
                }}
              >
                Components Hub
              </div>
            </div>

            {/* Category Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: isDark ? "#262626" : "#f5f5f5",
                border: `1px solid ${isDark ? "#404040" : "#e5e5e5"}`,
                borderRadius: "8px",
                padding: "8px 16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  marginRight: "8px",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: textColor,
                  fontWeight: "500",
                }}
              >
                {category}
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: textColor,
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "20px",
                color: mutedColor,
                lineHeight: 1.4,
                marginBottom: "32px",
              }}
            >
              {description}
            </div>

            {/* Template Features */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  color: textColor,
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginRight: "12px",
                  }}
                />
                Ready-to-use components
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  color: textColor,
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginRight: "12px",
                  }}
                />
                Responsive design
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  color: textColor,
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    marginRight: "12px",
                  }}
                />
                TypeScript support
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
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
      `Template OG Error: ${e instanceof Error ? e.message : "Unknown error"}`,
    );
    return new Response(
      `Failed to generate the image: ${e instanceof Error ? e.message : "Unknown error"}`,
      {
        status: 500,
      },
    );
  }
}
