import { useEffect } from "react";

export const Fake403 = () => {
  useEffect(() => {
    console.error("403 Forbidden: You don't have permission to access this resource.");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace, monospace",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1 style={{ fontSize: "clamp(64px, 18vw, 180px)", margin: 0, fontWeight: 900, letterSpacing: "-0.05em" }}>
          403
        </h1>
        <h2 style={{ fontSize: "clamp(20px, 4vw, 36px)", margin: "0.5rem 0 1rem", fontWeight: 700 }}>
          Forbidden
        </h2>
        <p style={{ fontSize: "clamp(14px, 2vw, 18px)", opacity: 0.7, margin: 0 }}>
          You don't have permission to access this resource on this server.
        </p>
      </div>
    </div>
  );
};
