import { getAuth } from 'firebase/auth';

export function reload() {
  return getAuth().currentUser?.reload();
}
export function get() {
  return getAuth().currentUser;
}
