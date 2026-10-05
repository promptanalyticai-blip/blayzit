// components/LoginCard.tsx
import LogoAnimated from "./LogoAnimated";
import OAuthButtons from "./OAuthButtons";
import PasswordInput from "./PasswordInput";
import MagicLink from "./MagicLink";
import FooterEnterprise from "./FooterEnterprise";
import ValidationMessages from "./ValidationMessages";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Ingresando… (demo)");
    }, 1500);
  };

  return (
    <div className="login-card">

      <h2 className="login-title">Bienvenido a BLAYZIT</h2>

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
        aria-label="Formulario de inicio de sesión"
      >
        <div className="input-group">
          <label>Email</label>
          <input
            aria-label="Campo de email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={!emailValid && email.length > 0 ? "input-error" : ""}
          />
        </div>

        <PasswordInput
          password={password}
          setPassword={setPassword}
          valid={passwordValid}
        />

        <ValidationMessages
          emailValid={emailValid}
          passwordValid={passwordValid}
        />

        <LoadingButton
          loading={loading}
          onClick={handleLogin}
          disabled={!emailValid || !passwordValid}
        >
          Ingresar
        </LoadingButton>
      </form>

      <MagicLink email={email} />

      <div className="login-links">
        <a href="/forgot">¿Olvidaste tu contraseña?</a>
        <a href="/register">Crear cuenta nueva</a>
      </div>

      <nav aria-label="Enlaces legales y de soporte">
        <FooterEnterprise />
      </nav>

    </div>
  );
}
