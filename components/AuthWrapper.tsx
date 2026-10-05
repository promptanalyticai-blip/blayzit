//components/AuthWrapper.tsx
export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-wrapper">
      {children}
    </div>
  );
}
