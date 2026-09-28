"use client";

export function GoogleLoginButton() {
  const login = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <button
      onClick={login}
      style={{
        padding: "10px 20px",
        background: "#4285F4",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Login con Google
    </button>
  );
}
