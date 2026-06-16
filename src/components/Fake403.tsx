import { useEffect } from "react";

export const Fake403 = () => {
  useEffect(() => {
    console.error("403 Forbidden: You don't have permission to access this resource.");
    const prevTitle = document.title;
    document.title = "403 Forbidden";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "#ffffff",
        color: "#000000",
        overflow: "auto",
        fontFamily: '"Times New Roman", Times, serif',
        textAlign: "center",
        padding: "3rem 1rem",
      }}
    >
      <h1 style={{ fontSize: "2.25rem", fontWeight: 700, margin: 0 }}>
        403 Forbidden
      </h1>
      <hr
        style={{
          border: 0,
          borderTop: "1px solid #000",
          margin: "1.25rem auto",
          width: "100%",
          maxWidth: "900px",
        }}
      />
      <p style={{ fontSize: "1rem", margin: 0, fontWeight: 700 }}>nginx</p>
    </div>
  );
};
