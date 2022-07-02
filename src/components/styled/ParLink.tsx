import { Link, LinkProps, styled } from '@mui/material';
import { FC } from 'react';

const LinkStyled = styled(Link)({
  textShadow: '1px 1px 5px black',
  '&:hover': {
    filter: 'brightness(115%)',
  },
}) as typeof Link;

type ParLinkProps = LinkProps & { component: React.ElementType<any> };

const ParLink: FC<ParLinkProps> = ({ children, ...props }) => {
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
};

export default ParLink;
