import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export const LeftPane: FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        position: {
          xs: 'static',
          md: 'sticky',
        },
        borderTopWidth: '0',
        borderBottomWidth: {
          xs: '6px',
          md: '0',
        },
        borderLeftWidth: {
          xs: '0',
          md: '10px',
        },
        borderRightWidth: {
          xs: '0',
          md: '10px',
        },
        borderStyle: 'solid',
        borderColor: 'secondary.main',
        boxShadow: '0 0 60px 2px #212121',
        backgroundColor: 'primary.main',
        top: '0px',
        height: {
          xs: '100%',
          md: '100vh',
        },
        padding: '2rem',
        flexBasis: '50%',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
