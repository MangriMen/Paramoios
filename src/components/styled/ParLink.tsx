import { Link, LinkProps, Palette, PaletteColor, styled } from '@mui/material';
import { ElementType } from 'react';

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

type ParLinkProps<C extends ElementType = any> = LinkProps<
  C,
  { component?: C }
> & {
  textShadowBase?: string;
  textShadowColor?: LinkProps['color'];
};

const ParLink = <C extends ElementType>({
  children,
  ...props
}: ParLinkProps<C>) => {
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
