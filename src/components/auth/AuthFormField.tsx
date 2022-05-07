import { TextField, TextFieldProps, styled, useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: '1.4rem',
    input: {
      '&:-webkit-autofill': {
        WebkitTextFillColor: theme.palette.secondary.main,
        WebkitBoxShadow:
          '0 0 0 1000px ' + theme.palette.primary.dark + ' inset',
      },
    },
    color: theme.palette.secondary.main,
    '& fieldset': {
      borderColor: theme.palette.secondary.main,
      borderWidth: '2px',
    },
    '&:hover fieldset': { borderColor: theme.palette.secondary.main },
  },
}));

function AuthFormField({
  fieldName,
  children,
  ...props
}: TextFieldProps & { fieldName: string }) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const { values, touched, errors, handleChange }: any = useFormikContext();

  const theme = useTheme();

  return (
    <TextFieldStyled
      id={fieldName}
      name={fieldName}
      autoComplete={fieldName}
      type={fieldName}
      label={t(`${fieldName}Placeholder`)}
      value={values[fieldName]}
      error={!!(touched[fieldName] && errors[fieldName])}
      helperText={touched[fieldName] && errors[fieldName]}
      onChange={handleChange}
      fullWidth
      margin="normal"
      color="secondary"
      variant="outlined"
      InputLabelProps={{
        sx: {
          fontSize: '1.4rem',
          color: theme.palette.secondary.main,
        },
      }}
      {...props}
    >
      {children}
    </TextFieldStyled>
  );
}

export default AuthFormField;
