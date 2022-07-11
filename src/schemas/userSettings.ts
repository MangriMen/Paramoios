import i18n from 'configs/i18next';
import * as yup from 'yup';

const t = i18n.getFixedT(null, null, 'schemas');

const usernameSettingsPrefix = `usernameSettings`;
const emailSettingsPrefix = `emailSettings`;
const passwordSettingsPrefix = `passwordSettings`;

export const usernameSettingsSchema = yup.object({
  username: yup
    .string()
    .max(20, t(`${usernameSettingsPrefix}.usernameMax`))
    .required(t(`${usernameSettingsPrefix}.usernameRequired`)),
});

export const emailSettingsSchema = yup.object({
  email: yup
    .string()
    .email(t(`${emailSettingsPrefix}.email`))
    .required(t(`${emailSettingsPrefix}.emailRequired`)),
});

export const passwordSettingsSchema = yup.object({
  currentPassword: yup
    .string()
    .required(t(`${passwordSettingsPrefix}.passwordRequired`))
    .matches(
      /^\S*$/,
      t(`${passwordSettingsPrefix}.passwordMustNotContainSpaces`),
    )
    .min(8, t(`${passwordSettingsPrefix}.passwordMin`)),
  newPassword: yup
    .string()
    .required(t(`${passwordSettingsPrefix}.passwordRequired`))
    .matches(
      /^\S*$/,
      t(`${passwordSettingsPrefix}.passwordMustNotContainSpaces`),
    )
    .min(8, t(`${passwordSettingsPrefix}.passwordMin`)),
  confirmPassword: yup
    .string()
    .required(t(`${passwordSettingsPrefix}.confirmPasswordRequired`))
    .oneOf(
      [yup.ref('newPassword')],
      t(`${passwordSettingsPrefix}.passwordMatch`),
    ),
});
