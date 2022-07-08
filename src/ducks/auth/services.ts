import { auth } from 'configs/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { LoginPayload, RegisterPayload } from './interfaces';

export function login(payload: LoginPayload) {
  if (auth === undefined) {
    throw new Error('Login failed. With auth being undefined');
  }

  return signInWithEmailAndPassword(auth, payload.email, payload.password);
}

export function register(payload: RegisterPayload) {
  if (auth === undefined) {
    throw new Error('Register failed. With auth being undefined');
  }

  return createUserWithEmailAndPassword(auth, payload.email, payload.password);
}

export function logout() {
  if (auth === undefined) {
    throw new Error('Logout failed. With auth being undefined');
  }

  return signOut(auth);
}
