import { Box, Container, ContainerProps } from '@mui/material';
import { FC } from 'react';

export const WelcomePage: FC<ContainerProps> = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          ...sx,
          padding: {
            xs: '0',
            md: '0 24px',
          },
          display: {
            xs: 'block',
            md: 'flex',
          },
          position: 'relative',
        }}
        {...props}
      >
        {children}
      </Container>
    </Box>
  );
};
