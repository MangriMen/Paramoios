import * as yup from 'yup';

export const usernameSettingsSchema = yup.object({
  username: yup
    .string()
    .max(20, 'nick should be less 20 chars')
    .required('Username is required'),
});

export const emailSettingsSchema = yup.object({
  email: yup.string().email().required('Email is required'),
});

export const passwordSettingsSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .matches(/^\S*$/, 'whitespace is not allowed')
    .min(8, 'password should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
