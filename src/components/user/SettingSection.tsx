import { Box, BoxProps, Typography } from '@mui/material';
import ParDivider from 'components/styled/ParDivider';
import { FC } from 'react';

export const SettingSection: FC<
  BoxProps & { title: string; containerProps?: BoxProps }
> = ({ title, containerProps, children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" color="primary.dark">
        {title}
      </Typography>
      <ParDivider sx={{ width: '100%', marginBottom: '1rem' }} />
      <Box {...containerProps}>{children}</Box>
    </Box>
  );
};
