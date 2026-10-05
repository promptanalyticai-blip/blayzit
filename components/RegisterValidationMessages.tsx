//components/RegisterValidationMessages.tsx
interface RegisterValidationMessagesProps {
  emailValid: boolean;
  passwordValid: boolean;
  passwordsMatch: boolean;
}

export default function RegisterValidationMessages({
  emailValid,
  passwordValid,
  passwordsMatch,
}: RegisterValidationMessagesProps) {
  return (
    <div className="validation-messages">
      {!emailValid && (
        <p className="error-text">Ingresa un email válido.</p>
      )}
      {!passwordValid && (
        <p className="error-text">
          La contraseña debe tener al menos 8 caracteres.
        </p>
      )}
      {!passwordsMatch && (
        <p className="error-text">
          Las contraseñas no coinciden.
        </p>
      )}
    </div>
  );
}
