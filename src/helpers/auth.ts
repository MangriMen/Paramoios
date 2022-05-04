import * as yup from 'yup';

export const registerSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
    .nullable(false),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .nullable(false)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .nullable(false)
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const loginSchema = yup.object({
  email: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const loginInitialValues = {
  email: '',
  password: '',
};

export const registerInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
