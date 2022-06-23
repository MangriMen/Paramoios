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
      marginTop={TITLE_HEIGHT}
    >
      {title && (
        <Typography
          boxSizing="border-box"
          position="absolute"
          top={`-${TITLE_HEIGHT}`}
          minWidth="20%"
          padding="0 0.4rem"
          textAlign="center"
          bgcolor="secondary.main"
          border="4px solid"
          borderColor="primary.main"
          borderRadius="4px"
        >
          {title}
        </Typography>
      )}
      <Box
        alignSelf="stretch"
        bgcolor="secondary.main"
        border="4px solid"
        borderColor="primary.main"
        borderRadius="4px"
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParBox;
