//components/ForgotValidationMessages.tsx
interface ForgotValidationMessagesProps {
  emailValid: boolean;
}

export default function ForgotValidationMessages({
  emailValid,
}: ForgotValidationMessagesProps) {
  return (
    <div className="validation-messages">
      {!emailValid && (
        <p className="error-text">Ingresa un email válido.</p>
      )}
    </div>
  );
}
