///components/AuthBackground.tsx
interface AuthBackgroundProps {
  variant: "login" | "register" | "forgot";
}

export default function AuthBackground({ variant }: AuthBackgroundProps) {
  return <div className={`auth-background ${variant}`} />;
}
