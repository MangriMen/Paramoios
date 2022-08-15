import { Box, Typography } from '@mui/material';
import ParDivider from 'components/styled/ParDivider';
import { useTranslation } from 'react-i18next';

export const PersonalizationView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'userSettings' });

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Typography variant="h3" color="primary.dark">
          {t('themeSettings')}
        </Typography>
        <ParDivider sx={{ width: '100%', marginBottom: '1rem' }} />
      </Box>
    </Box>
  );
};
