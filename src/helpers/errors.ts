import i18n from 'configs/i18next';
import { FirebaseError } from 'firebase/app';

export function getErrorMessage(err: unknown) {
  if (err instanceof FirebaseError) {
    return i18n.getFixedT(null, null, 'firebase')(err.code);
  } else if (err instanceof Error) {
    return i18n.getFixedT(null, null, 'error')(err.message);
  } else {
    return String(err);
  }
}
