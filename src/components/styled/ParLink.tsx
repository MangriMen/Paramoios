import { Link, LinkProps, Palette, PaletteColor, styled } from '@mui/material';
import { FC } from 'react';

const LinkStyled = styled(Link, {
  shouldForwardProp: (prop) =>
    prop !== 'textShadowBase' && prop !== 'textShadowColor',
})<{
  textShadowBase?: ParLinkProps['textShadowBase'];
  textShadowColor?: ParLinkProps['textShadowColor'];
}>(({ theme, textShadowBase, textShadowColor }) => {
  const textShadowBase_ = textShadowBase?.trim() ?? '1px 1px 5px';
  const textShadowColor_ =
    (theme.palette[textShadowColor as keyof Palette] as PaletteColor)?.main ??
    textShadowColor ??
    'black';

  const textShadow_ = `${textShadowBase_} ${textShadowColor_}`;

  return {
    textShadow: textShadow_,
    '&:hover': {
      filter: 'brightness(115%)',
    },
  };
});

type ParLinkProps = LinkProps & {
  textShadowBase?: string;
  textShadowColor?: LinkProps['color'];
  component: React.ElementType<any>;
};

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
