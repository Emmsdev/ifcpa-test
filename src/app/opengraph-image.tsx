import { ImageResponse } from "next/og";

export const alt = "IFCPA / CRTV — Former, créer, préserver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "72px 82px", background: "#f8f9fa", color: "#00204f", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 790 }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: "0.08em", color: "#42bcf5" }}>IFCPA / CRTV</div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 66, lineHeight: 1.05, fontWeight: 700 }}>Former. Créer. Préserver.</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, lineHeight: 1.4, color: "#44474f" }}>Les métiers de l’image, du son et la mémoire audiovisuelle du Cameroun.</div>
      </div>
      <div style={{ width: 210, height: 210, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 28, background: "#00204f" }}>
        <div style={{ width: 126, height: 126, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, border: "22px solid #42bcf5" }}>
          <div style={{ width: 30, height: 30, borderRadius: 999, background: "#f8f9fa" }} />
        </div>
      </div>
    </div>,
    size,
  );
}
