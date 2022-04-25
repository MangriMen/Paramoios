import { auth } from "helpers/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export function login(payload: any) {
  return signInWithEmailAndPassword(auth, payload.email, payload.password);
}

export function logout(payload: any) {
  return signOut(auth);
}

export function register(payload: any) {
  return createUserWithEmailAndPassword(auth, payload.email, payload.password);
}

export function setUserDisplayName(payload: any) {
  if (auth?.currentUser) {
    return updateProfile(auth.currentUser, { displayName: payload.username });
  }
}
