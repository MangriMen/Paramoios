import { auth } from 'configs/firebase';

export function reload() {
  return auth?.currentUser?.reload();
}
export function get() {
  return auth?.currentUser;
}
