import { auth, storage } from 'configs/firebase';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

export function setUserDisplayName(payload: string) {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error('Set user name failed. With currentUser being undefined');
  }
  return updateProfile(auth.currentUser, { displayName: payload });
}

export function setUserEmail(payload: string) {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error('Set user email failed. With currentUser being undefined');
  }

  return updateEmail(auth.currentUser, payload);
}

export function setUserPassword(payload: string) {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error(
      'Set user password failed. With currentUser being undefined',
    );
  }

  return updatePassword(auth.currentUser, payload);
}

export function setUserAvatar(payload: string) {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error('Set user avatar failed. With currentUser being undefined');
  }

  return updateProfile(auth.currentUser, { photoURL: payload });
}

export function uploadFileToStorage(payload: string) {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error(
      'Upload to storage failed. With currentUser being undefined',
    );
  }

  if (storage === undefined) {
    throw new Error('Upload to storage failed. With storage being undefined');
  }

  const storageRef = ref(storage, auth.currentUser.uid);
  return uploadString(storageRef, payload, 'data_url');
}

export function getFileUrlFromStorage(payload: StorageReference) {
  return getDownloadURL(payload);
}
