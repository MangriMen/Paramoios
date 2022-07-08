import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

const ParBox: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      bgcolor="secondary.main"
      border="4px solid"
      borderColor="primary.main"
      borderRadius="4px"
      {...props}
    >
      {children}
    </Box>
  );
};

export default ParBox;
