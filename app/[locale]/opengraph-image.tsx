import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "impots.tax — Centre de Commandement Fiscal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0c10",
          color: "#ffffff",
          fontFamily: "monospace",
        }}
      >
        {/* Tricolore stripe */}
        <div style={{ display: "flex", height: "6px", width: "100%" }}>
          <div style={{ flex: 1, backgroundColor: "#002395" }} />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
          <div style={{ flex: 1, backgroundColor: "#ED2939" }} />
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              letterSpacing: "8px",
              color: "#ff2d2d",
              textTransform: "uppercase",
            }}
          >
            impots.tax
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              color: "#6b7280",
              marginTop: "16px",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            Centre de Commandement Fiscal
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              marginTop: "48px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#ff2d2d" }}>
                46.1%
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                TAXES / PIB — №1 OCDE
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#ffb020" }}>
                52%
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                TAUX D&apos;EXTRACTION
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#00d4ff" }}>
                112%
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                DETTE / PIB
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "16px",
              color: "#4b5563",
              marginTop: "40px",
              letterSpacing: "2px",
            }}
          >
            DONNÉES RÉELLES • PRÉSENTATION SATIRIQUE • SOURCES OFFICIELLES
          </div>
        </div>

        {/* Tricolore stripe */}
        <div style={{ display: "flex", height: "6px", width: "100%" }}>
          <div style={{ flex: 1, backgroundColor: "#002395" }} />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
          <div style={{ flex: 1, backgroundColor: "#ED2939" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
