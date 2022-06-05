import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const BoxStyled = styled(Box)(({ theme }) => ({}));

const ParBox: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <BoxStyled
      bgcolor="secondary.main"
      border="4px solid"
      borderColor="primary.main"
      borderRadius="4px"
      {...props}
    >
      {children}
    </BoxStyled>
  );
};

export default ParBox;
