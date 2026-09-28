"use client";

export function LogoutButton() {
  const logout = () => {
    window.location.href = "/auth/logout";
  };

  return (
    <button
      onClick={logout}
      style={{
        padding: "10px 20px",
        background: "#d9534f",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
