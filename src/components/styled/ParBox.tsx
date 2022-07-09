import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

const ParBox: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      border="2px solid"
      borderRadius="4px"
      borderColor="primary.main"
      bgcolor="secondary.main"
      {...props}
    >
      {children}
    </Box>
  );
};

export default ParBox;
