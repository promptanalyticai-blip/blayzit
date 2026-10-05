//components/PasswordStrength.tsx
interface PasswordStrengthProps {
  password: string;
}

function getStrengthLabel(password: string): string {
  if (!password) return "";
  if (password.length < 8) return "Débil";
  if (password.length < 12) return "Media";
  return "Fuerte";
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const label = getStrengthLabel(password);
  if (!label) return null;

  return (
    <p className="password-strength">
      Fuerza de la contraseña: {label}
    </p>
  );
}
