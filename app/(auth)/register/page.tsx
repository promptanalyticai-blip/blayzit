//app/(auth)/register/page.tsx
"use client";

import RegisterCard from "@/components/RegisterCard";
import { useEffect } from "react";
import { applyTheme } from "@/utils/theme";

export default function RegisterPage() {
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <div className="login-container">
      <RegisterCard />
    </div>
  );
}
