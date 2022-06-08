import { auth } from 'configs/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export function login(payload: any) {
  if (auth === undefined) {
    throw new Error('Login failed. With auth being undefined');
  }

  return signInWithEmailAndPassword(auth, payload.email, payload.password);
}

export function logout() {
  if (auth === undefined) {
    throw new Error('Logout failed. With auth being undefined');
  }

  return signOut(auth);
}

export function register(payload: any) {
  if (auth === undefined) {
    throw new Error('Register failed. With auth being undefined');
  }

  return createUserWithEmailAndPassword(auth, payload.email, payload.password);
}
