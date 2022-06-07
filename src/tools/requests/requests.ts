import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { auth } from 'helpers/firebase';

export function setUserDisplayName(payload: any) {
  if (auth?.currentUser) {
    return updateProfile(auth.currentUser, { displayName: payload.username });
  }
}

export function setUserEmail(payload: any) {
  if (auth?.currentUser) {
    return updateEmail(auth.currentUser, `${payload.email}`);
  }
}

export function setUserPassword(payload: any) {
  if (auth?.currentUser) {
    return updatePassword(auth.currentUser, `${payload.password}`);
  }
}
