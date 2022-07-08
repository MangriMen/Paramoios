import { auth } from 'configs/firebase';

export function reload() {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error('Reload user failed. With currentUser being undefined');
  }

  return auth?.currentUser?.reload();
}
export function get() {
  if (auth?.currentUser === null || auth?.currentUser === undefined) {
    throw new Error('Get user failed. With currentUser being undefined');
  }

  return auth?.currentUser;
}
