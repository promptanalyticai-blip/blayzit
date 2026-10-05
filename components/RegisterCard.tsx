//components/RegisterCard.tsx
import LogoAnimated from "./LogoAnimated";
import OAuthButtons from "./OAuthButtons";
import FooterEnterprise from "./FooterEnterprise";
import LoadingButton from "./LoadingButton";
import PasswordStrength from "./PasswordStrength";
import RegisterValidationMessages from "./RegisterValidationMessages";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";

export default function RegisterCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);
  const passwordsMatch = password === confirm && password.length > 0;

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Cuenta creada (demo).");
    }, 1500);
  };

  return (
    <div className="login-card">

      <h2 className="login-title">Crear cuenta en BLAYZIT</h2>

      <LogoAnimated />

      <p className="login-tagline">
        Tecnología para decisiones inteligentes — DNIP
      </p>

      <p className="login-branding">
        DNIP — Arquitectura inteligente que convierte datos en decisiones.
      </p>

      <OAuthButtons />

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label="Formulario de registro"
      >
        <div className="input-group">
          <label>Email</label>
          <input
            aria-label="Campo de email para registro"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={!emailValid && email.length > 0 ? "input-error" : ""}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            aria-label="Campo de contraseña para registro"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={!passwordValid && password.length > 0 ? "input-error" : ""}
          />
          <PasswordStrength password={password} />
        </div>

        <div className="input-group">
          <label>Confirmar password</label>
          <input
            aria-label="Campo de confirmación de contraseña"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={!passwordsMatch && confirm.length > 0 ? "input-error" : ""}
          />
        </div>

        <RegisterValidationMessages
          emailValid={emailValid}
          passwordValid={passwordValid}
          passwordsMatch={passwordsMatch}
        />

        <LoadingButton
          loading={loading}
          onClick={handleRegister}
          disabled={!emailValid || !passwordValid || !passwordsMatch}
        >
          Crear cuenta
        </LoadingButton>
      </form>

      <div className="login-links">
        <a href="/login">¿Ya tienes cuenta? Iniciar sesión</a>
        <a href="/forgot">¿Olvidaste tu contraseña?</a>
      </div>

      <nav aria-label="Enlaces legales y de soporte">
        <FooterEnterprise />
      </nav>

    </div>
  );
}
