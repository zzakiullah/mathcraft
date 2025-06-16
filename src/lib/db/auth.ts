import { supabase } from "./supabaseClient";

export async function signUpWithEmail(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { username: username } },
  });
  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
  return { data, error };
}

export async function isUsernameUnique(username: string) {
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .ilike("username", username)
    .limit(1);
  if (error) {
    return null;
  }
  return data.length === 0;
}

export async function resendConfirmationEmail(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: "https://zulaikha.me/mathcraft/dashboard",
    },
  });
  return { error };
}
