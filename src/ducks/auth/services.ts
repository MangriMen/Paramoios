import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { LoginPayload, RegisterPayload } from './interfaces';

export function login(payload: LoginPayload) {
  return signInWithEmailAndPassword(getAuth(), payload.email, payload.password);
}

export function register(payload: RegisterPayload) {
  return createUserWithEmailAndPassword(
    getAuth(),
    payload.email,
    payload.password,
  );
}

export function logout() {
  return signOut(getAuth());
}
