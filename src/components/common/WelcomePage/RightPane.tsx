import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export const RightPane: FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexBasis: '50%',
        paddingLeft: {
          xs: '0',
          md: '80px',
        },
        paddingRight: {
          xs: '0',
          md: '40px',
          lg: '20px',
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
