import { Box, BoxProps, Typography } from '@mui/material';
import { FC } from 'react';

interface ParBoxProps extends BoxProps {
  title?: string;
}

const TITLE_HEIGHT = '0.9rem';

const ParBox: FC<ParBoxProps> = ({ title, children, ...props }) => {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={title ? TITLE_HEIGHT : 0}
    >
      {title && (
        <Typography
          boxSizing="border-box"
          position="absolute"
          top={`-${TITLE_HEIGHT}`}
          minWidth="20%"
          padding="0 0.4rem"
          textAlign="center"
          border="2px solid"
          borderRadius="4px"
          borderColor="primary.main"
          bgcolor="secondary.main"
        >
          {title}
        </Typography>
      )}
      <Box
        alignSelf="stretch"
        border="2px solid"
        borderRadius="4px"
        borderColor="primary.main"
        bgcolor="secondary.main"
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParBox;
