import i18n from 'configs/i18next';
import * as yup from 'yup';

const t = i18n.getFixedT(null, null, 'schemas');

const registerPrefix = `register`;
const loginPrefix = `login`;

export const registerSchema = yup.object({
  username: yup
    .string()
    .max(20, t(`${registerPrefix}.usernameMax`))
    .required(t(`${registerPrefix}.usernameRequired`)),
  email: yup
    .string()
    .email(t(`${registerPrefix}.email`))
    .required(t(`${registerPrefix}.emailRequired`))
    .nullable(false),
  password: yup
    .string()
    .min(8, t(`${registerPrefix}.passwordMin`))
    .matches(/^\S*$/, t(`${registerPrefix}.passwordMustNotContainSpaces`))
    .nullable(false)
    .required(t(`${registerPrefix}.passwordRequired`)),
  confirmPassword: yup
    .string()
    .nullable(false)
    .required(t(`${registerPrefix}.confirmPasswordRequired`))
    .oneOf([yup.ref('password')], t(`${registerPrefix}.passwordMatch`)),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email(t(`${loginPrefix}.email`))
    .required(t(`${loginPrefix}.usernameRequired`)),
  password: yup
    .string()
    .min(8, t(`${loginPrefix}.passwordMin`))
    .required(t(`${loginPrefix}.passwordRequired`)),
});
