import { Typography } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { useTranslation } from 'react-i18next';

function NotFoundPageComponent() {
  const { t } = useTranslation('translation', { keyPrefix: 'page' });

  return (
    <ParBox
      minWidth="100%"
      minHeight="calc(100% - 2rem)"
      border="0"
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
        fontSize={{
          xs: '2rem',
          md: '4rem',
        }}
      >
        <Typography
          fontSize={{
            xs: '8rem',
            md: '10rem',
          }}
          lineHeight="10rem"
          color="primary"
          textAlign="center"
        >
          404
        </Typography>
        <Typography
          fontSize="inherit"
          fontWeight="bold"
          color="primary"
          textAlign="center"
        >
          {t(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quo accusantium, minus sapiente facilis consequuntur error tenetur laboriosam recusandae ut!',
          )}
        </Typography>
        <Typography
          fontSize={{
            xs: '1.5rem',
            md: '3rem',
          }}
          fontWeight="bold"
          color="primary.light"
          textAlign="center"
        >
          {t('notFoundDescription')}
        </Typography>
      </ParBox>
    </ParBox>
  );
}

export default NotFoundPageComponent;
