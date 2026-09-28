//app/auth/logout/page.tsx

"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await supabaseClient.auth.signOut();
      router.replace("/login");
    }

    logout();
  }, [router]);

  return (
    <div className="p-6">
      <p>Cerrando sesión...</p>
    </div>
  );
}
