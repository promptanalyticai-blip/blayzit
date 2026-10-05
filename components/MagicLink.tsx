///components/MagicLink.tsx
import LoadingButton from "./LoadingButton";
import { useState } from "react";

interface MagicLinkProps {
  email: string;
}

export default function MagicLink({ email }: MagicLinkProps) {
  const [loading, setLoading] = useState(false);

  const handleMagicLink = () => {
    if (!email) {
      alert("Ingresa tu email para enviar el enlace mágico.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Enlace mágico enviado a ${email} (demo).`);
    }, 1500);
  };

  return (
    <div className="magic-link-container">
      <LoadingButton
        loading={loading}
        onClick={handleMagicLink}
        disabled={!email}
        variant="secondary"
      >
        Enviar enlace mágico a mi email
      </LoadingButton>
    </div>
  );
}
