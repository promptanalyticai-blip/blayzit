///components/ValidationMessages.tsx
interface ValidationMessagesProps {
  emailValid: boolean;
  passwordValid: boolean;
}

export default function ValidationMessages({
  emailValid,
  passwordValid,
}: ValidationMessagesProps) {
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
    </div>
  );
}
