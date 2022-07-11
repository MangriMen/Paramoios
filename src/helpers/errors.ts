import { FirebaseError } from 'firebase/app';
import i18n from 'i18next';

export function getErrorMessage(err: unknown) {
  if (err instanceof FirebaseError) {
    return i18n.getFixedT(null, null, 'firebase')(err.code);
  } else if (err instanceof Error) {
    return i18n.getFixedT(null, null, 'error')(err.message);
  } else {
    return String(err);
  }
}
