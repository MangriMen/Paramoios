import i18n from 'configs/i18next';
import * as yup from 'yup';

const t = i18n.getFixedT(null, null, 'schemas');

export const usernameSettingsSchema = yup.object({
  username: yup
    .string()
    .max(20, t('usernameMax'))
    .required(t('usernameRequired')),
});

export const emailSettingsSchema = yup.object({
  email: yup.string().email(t('email')).required(t('emailRequired')),
});

export const passwordSettingsSchema = yup.object({
  currentPassword: yup
    .string()
    .required(t('passwordRequired'))
    .matches(/^\S*$/, t('passwordMustNotContainSpaces'))
    .min(8, t('passwordMin')),
  newPassword: yup
    .string()
    .required(t('passwordRequired'))
    .matches(/^\S*$/, t('passwordMustNotContainSpaces'))
    .min(8, t('passwordMin')),
  confirmPassword: yup
    .string()
    .required(t('confirmPasswordRequired'))
    .oneOf([yup.ref('newPassword')], t('passwordMatch')),
});
