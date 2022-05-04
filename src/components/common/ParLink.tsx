import { Link, styled } from '@mui/material';

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '1.4rem',
  textShadow: '1px 1px 5px black',
  fontWeight: 'bold',
  '&:hover': {
    color: theme.palette.secondary.light,
  },
}));

function ParLink({ children, ...props }: any) {
  return (
    <LinkStyled color="secondary" underline="none" variant="button" {...props}>
      {children}
    </LinkStyled>
  );
}

export default ParLink;
