//app/(auth)/forgot/page.tsx
"use client";

import ForgotPasswordCard from "@/components/ForgotPasswordCard";
import { useEffect } from "react";
import { applyTheme } from "@/utils/theme";

export default function ForgotPage() {
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <div className="login-container">
      <ForgotPasswordCard />
    </div>
  );
}
