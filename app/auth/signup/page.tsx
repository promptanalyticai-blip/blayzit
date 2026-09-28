//app/auth/signup/page.tsx

async function handleSignup() {
  setError("");

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    setError(error.message);
    return;
  }

  const userId = data.user?.id;

  if (!userId) {
    setError("No se pudo obtener el usuario.");
    return;
  }

  // Crear empresa + workspace
  await fetch("/api/company/create", {
    method: "POST",
    body: JSON.stringify({ userId, email }),
  });

  // Enviar email de bienvenida
  await fetch("/api/email/welcome", {
    method: "POST",
    body: JSON.stringify({ email, name: email.split("@")[0] }),
  });

  router.replace("/init");
}
