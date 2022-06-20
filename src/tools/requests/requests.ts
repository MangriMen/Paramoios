import { auth, storage } from 'configs/firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

export function setUserDisplayName(payload: string) {
  if (auth?.currentUser) {
    return updateProfile(auth.currentUser, { displayName: payload });
  }
}

export function setUserEmail(payload: string) {
  if (auth?.currentUser) {
    return updateEmail(auth.currentUser, payload);
  }
}

export function setUserPassword(payload: string) {
  if (auth?.currentUser) {
    return updatePassword(auth.currentUser, payload);
  }
}

export function setUserAvatar(payload: string) {
  if (auth?.currentUser) {
    return updateProfile(auth.currentUser, { photoURL: payload });
  }
}

export function uploadFileToStorage(payload: string) {
  if (auth?.currentUser && storage) {
    const storageRef = ref(storage, auth.currentUser.uid);
    return uploadString(storageRef, payload, 'data_url');
  }
}

export function getFileUrlFromStorage(payload: StorageReference) {
  if (auth?.currentUser) {
    return getDownloadURL(payload);
  }
}
