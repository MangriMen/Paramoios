import { TextField, TextFieldProps, styled } from '@mui/material';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export type AuthFormFieldProps = TextFieldProps & {
  fieldName: string;
  themeColor?: TextFieldProps['color'];
};

const TextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'themeColor',
})<{ themeColor: Exclude<TextFieldProps['color'], undefined> }>(
  ({ theme, themeColor }) => ({
    '& .MuiOutlinedInput-root': {
      fontSize: '1.4rem',
      input: {
        '&:-webkit-autofill': {
          WebkitTextFillColor: theme.palette[themeColor].main,
          WebkitBoxShadow: `0 0 0 1000px
          ${
            theme.palette[themeColor === 'secondary' ? 'primary' : 'secondary'][
              themeColor === 'secondary' ? 'dark' : 'light'
            ]
          }
          inset`,
        },
      },
      color: theme.palette[themeColor].main,
      '& fieldset': {
        borderColor: theme.palette[themeColor].main,
        borderWidth: '2px',
      },
      '&:hover fieldset': { borderColor: theme.palette[themeColor].main },
    },
  }),
);

const AuthFormField: FC<AuthFormFieldProps> = ({
  fieldName,
  themeColor,
  children,
  ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const { values, touched, errors, handleChange }: any = useFormikContext();

  const calculatedColor = themeColor || 'primary';

  return (
    <TextFieldStyled
      id={fieldName}
      name={fieldName}
      autoComplete={fieldName}
      label={t(`${fieldName}Placeholder`)}
      value={values[fieldName]}
      error={!!(touched[fieldName] && errors[fieldName])}
      helperText={touched[fieldName] && errors[fieldName]}
      onChange={handleChange}
      color={calculatedColor}
      themeColor={calculatedColor}
      variant="outlined"
      InputLabelProps={{
        sx: {
          fontSize: '1.4rem',
          color: `${calculatedColor}.main`,
        },
      }}
      {...props}
    >
      {children}
    </TextFieldStyled>
  );
};

export default AuthFormField;
