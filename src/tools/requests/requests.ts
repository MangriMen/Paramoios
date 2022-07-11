import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';

export function setUserDisplayName(payload: string) {
  const auth = getAuth();

  if (auth.currentUser === null) {
    throw new FirebaseError(
      'user/not-logged-in',
      'Error update username (user/not-logged-in)',
    );
  }

  return updateProfile(auth.currentUser, { displayName: payload });
}

export function setUserEmail(payload: string) {
  const auth = getAuth();

  if (auth.currentUser === null) {
    throw new FirebaseError(
      'user/not-logged-in',
      'Error update email (user/not-logged-in)',
    );
  }

  return updateEmail(auth.currentUser, payload);
}

export function setUserPassword(payload: string) {
  const auth = getAuth();

  if (auth.currentUser === null) {
    throw new FirebaseError(
      'user/not-logged-in',
      'Error update password (user/not-logged-in)',
    );
  }

  return updatePassword(auth.currentUser, payload);
}

export function setUserAvatar(payload: string) {
  const auth = getAuth();

  if (auth.currentUser === null) {
    throw new FirebaseError(
      'user/not-logged-in',
      'Error update avatar (user/not-logged-in)',
    );
  }

  return updateProfile(auth.currentUser, { photoURL: payload });
}

export function uploadFileToStorage(payload: string) {
  const auth = getAuth();

  if (auth.currentUser === null) {
    throw new FirebaseError('user/not-logged-in', 'Error (user/not-logged-in)');
  }

  const storage = getStorage();

  const storageRef = ref(storage, auth.currentUser.uid);

  return uploadString(storageRef, payload, 'data_url');
}

export function getFileUrlFromStorage(payload: StorageReference) {
  return getDownloadURL(payload);
}
