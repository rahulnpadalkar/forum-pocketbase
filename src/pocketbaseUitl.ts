import Pocketbase from "pocketbase";

const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL);

export function checkIfLoggedIn(): boolean {
  return pb.authStore.isValid;
}

export async function initiateSignUp() {
  await pb.collection("users").authWithOAuth2({ provider: "github" });
}

export function logout() {
  pb.authStore.clear();
}

export function getPb() {
  return pb;
}
