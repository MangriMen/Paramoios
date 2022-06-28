import { Box, BoxProps, styled } from '@mui/material';
import { FC } from 'react';

const BoxStyled = styled(Box)(({ theme }) => ({}));

const ParBox: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <BoxStyled
      border="2px solid"
      borderRadius="4px"
      borderColor="primary.main"
      bgcolor="secondary.main"
      {...props}
    >
      {children}
    </BoxStyled>
  );
};

export default ParBox;
