import { auth, storage } from 'configs/firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

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

export function setUserAvatar(payload: any) {
  if (auth?.currentUser) {
    return updateProfile(auth.currentUser, { photoURL: payload });
  }
}

export function uploadFileToStorage(payload: any) {
  if (auth?.currentUser && storage) {
    const storageRef = ref(storage, auth.currentUser.uid);
    return uploadString(storageRef, payload, 'data_url');
  }
}

export function getFileUrlFromStorage(payload: any) {
  if (auth?.currentUser) {
    return getDownloadURL(payload);
  }
}
