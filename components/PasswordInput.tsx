///components/PasswordInput.tsx
import { useState } from "react";

export default function PasswordInput({ password, setPassword, valid }) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <label>Password</label>

      <div className="password-wrapper">
        <input
          aria-label="Campo de contraseña"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={!valid && password.length > 0 ? "input-error" : ""}
        />

        <span
          className="password-toggle"
          role="button"
          aria-label="Mostrar u ocultar contraseña"
          onClick={() => setShow(!show)}
        >
          {show ? "👁‍🗨" : "👁"}
        </span>
      </div>
    </div>
  );
}
