import { Link, styled } from '@mui/material';

const LinkStyled = styled(Link)(({ theme }) => ({
  textShadow: '1px 1px 5px black',
  '&:hover': {
    filter: 'brightness(115%)',
  },
}));

function ParLink({ children, ...props }: any) {
  return (
    <LinkStyled
      fontSize="1.4rem"
      color="secondary"
      underline="none"
      variant="button"
      fontWeight="bold"
      {...props}
    >
      {children}
    </LinkStyled>
  );
}

export default ParLink;
