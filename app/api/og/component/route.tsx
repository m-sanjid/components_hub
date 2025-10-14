import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Component";
    const description =
      searchParams.get("description") || "A beautiful React component";
    const category = searchParams.get("category") || "UI";
    const theme = searchParams.get("theme") || "light";

    // Theme colors
    const isDark = theme === "dark";
    const bgColor = isDark ? "#09090b" : "#ffffff";
    const textColor = isDark ? "#fafafa" : "#0a0a0a";
    const mutedColor = isDark ? "#a1a1aa" : "#525252";
    const accentColor = "#FF6100";
    const cardBg = isDark ? "#262626" : "#f5f5f5";
    const borderColor = isDark ? "#404040" : "#e5e5e5";

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
            padding: "60px 40px",
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

          {/* Category Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
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
              textAlign: "center",
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
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            {description}
          </div>

          {/* Component Preview Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "400px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                V
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: textColor,
                  }}
                >
                  Velnor UI
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: mutedColor,
                  }}
                >
                  React Component
                </div>
              </div>
            </div>

            {/* Mock component preview */}
            <div
              style={{
                backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${borderColor}`,
                borderRadius: "8px",
                padding: "16px",
                fontSize: "14px",
                color: textColor,
                fontFamily: "monospace",
              }}
            >
              &lt;{title.replace(/\s+/g, "")} /&gt;
            </div>
          </div>

          {/* Bottom accent */}
          <div
            style={{
              width: "100%",
              height: "3px",
              backgroundColor: accentColor,
              marginTop: "40px",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "content-type": "image/png",
          "cache-control": "public, max-age=0, s-maxage=31536000, immutable",
        },
      },
    );
  } catch (e: Error | unknown) {
    console.log(
      `Component OG Error: ${e instanceof Error ? e.message : "Unknown error"}`,
    );
    return new Response(
      `Failed to generate the image: ${e instanceof Error ? e.message : "Unknown error"}`,
      {
        status: 500,
      },
    );
  }
}
