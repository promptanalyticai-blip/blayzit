//components/LoadingButton.tsx
interface LoadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function LoadingButton({
  loading,
  disabled,
  onClick,
  children,
  variant = "primary",
}: LoadingButtonProps) {
  const className =
    variant === "primary" ? "btn-premium" : "btn-secondary";

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}
