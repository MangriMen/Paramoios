import { auth } from "helpers/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export function login(payload: any) {
  return signInWithEmailAndPassword(auth, payload.email, payload.password);
}

export function logout(payload: any) {
  return signOut(auth);
}
