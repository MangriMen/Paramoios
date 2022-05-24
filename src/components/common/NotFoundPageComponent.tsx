import { Typography } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { useTranslation } from 'react-i18next';

function NotFoundPageComponent() {
  const { t } = useTranslation('translation', { keyPrefix: 'page' });

  return (
    <ParBox
      position="fixed"
      height="100%"
      width="100%"
      // TODO Fix when bug/#30 is merged
      sx={{
        border: '0',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ParBox
        sx={{
          border: '0',
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        fontSize="4rem"
        marginBottom="20rem"
      >
        <Typography fontSize="10rem" lineHeight="10rem" color="primary">
          404
        </Typography>
        <Typography fontSize="inherit" fontWeight="bold" color="primary">
          {t('notFound')}
        </Typography>
        <Typography fontSize="3rem" fontWeight="bold" color="primary.light">
          {t('notFoundDescription')}
        </Typography>
      </ParBox>
    </ParBox>
  );
}

export default NotFoundPageComponent;
