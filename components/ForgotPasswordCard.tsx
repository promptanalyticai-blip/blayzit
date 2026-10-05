//components/ForgotPasswordCard.tsx
import LogoAnimated from "./LogoAnimated";
import FooterEnterprise from "./FooterEnterprise";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { validateEmail } from "@/utils/validation";

export default function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = validateEmail(email);

  const handleReset = () => {
    if (!emailValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Se envió un enlace de recuperación a ${email} (demo).`);
    }, 1500);
  };

  return (
    <div className="login-card">

      <h2 className="login-title">Recuperar contraseña</h2>

      <LogoAnimated />

      <p className="login-tagline">
        Tecnología para decisiones inteligentes — DNIP
      </p>

      <p className="login-branding">
        DNIP — Arquitectura inteligente que convierte datos en decisiones.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label="Formulario de recuperación de contraseña"
      >
        <div className="input-group">
          <label>Email asociado a tu cuenta</label>
          <input
            aria-label="Campo de email para recuperación"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={!emailValid && email.length > 0 ? "input-error" : ""}
          />
        </div>

        {!emailValid && email.length > 0 && (
          <p className="error-text">Ingresa un email válido.</p>
        )}

        <LoadingButton
          loading={loading}
          onClick={handleReset}
          disabled={!emailValid}
        >
          Enviar enlace de recuperación
        </LoadingButton>
      </form>

      <div className="login-links">
        <a href="/login">Volver al inicio de sesión</a>
        <a href="/register">Crear cuenta nueva</a>
      </div>

      <nav aria-label="Enlaces legales y de soporte">
        <FooterEnterprise />
      </nav>

    </div>
  );
}
