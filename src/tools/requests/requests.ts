import { auth } from 'configs/firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';

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
