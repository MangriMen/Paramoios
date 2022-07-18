import i18n from 'configs/i18next';
import * as yup from 'yup';

const t = i18n.getFixedT(null, null, 'schemas');

export const registerSchema = yup.object({
  username: yup
    .string()
    .max(20, t('usernameMax'))
    .required(t('usernameRequired')),
  email: yup
    .string()
    .email(t('email'))
    .required(t('emailRequired'))
    .nullable(false),
  password: yup
    .string()
    .min(8, t('passwordMin'))
    .matches(/^\S*$/, t('passwordMustNotContainSpaces'))
    .nullable(false)
    .required(t('passwordRequired')),
  confirmPassword: yup
    .string()
    .nullable(false)
    .required(t('confirmPasswordRequired'))
    .oneOf([yup.ref('password')], t('passwordMatch')),
});

export const loginSchema = yup.object({
  email: yup.string().email(t('$email')).required(t('$usernameRequired')),
  password: yup
    .string()
    .min(8, t('$passwordMin'))
    .required(t('$passwordRequired')),
});
