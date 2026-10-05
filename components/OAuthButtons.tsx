///components/OAuthButtons.tsx
export default function OAuthButtons() {
  return (
    <div className="oauth-container">
      <button className="oauth-btn google">Continuar con Google</button>
      <button className="oauth-btn microsoft">Continuar con Microsoft</button>
      <button className="oauth-btn github">Continuar con GitHub</button>
      <button className="oauth-btn apple">Continuar con Apple</button>
    </div>
  );
}
