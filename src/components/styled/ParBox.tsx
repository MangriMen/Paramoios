import { Box, BoxProps, styled } from '@mui/material';

const BoxStyled = styled(Box)(({ theme }) => ({}));

function ParBox({ children, ...props }: BoxProps) {
  return (
    <BoxStyled
      border="4px solid"
      borderColor="primary.main"
      borderRadius="4px"
      {...props}
    >
      {children}
    </BoxStyled>
  );
}

export default ParBox;
