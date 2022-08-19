import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

interface ParBoxProps extends BoxProps {
  title?: string;
  shadow?: boolean;
  titleProps?: TypographyProps;
  containerProps?: BoxProps;
}

const TITLE_HEIGHT = '0.9rem';

const ParBox: FC<ParBoxProps> = ({
  title,
  shadow,
  titleProps,
  containerProps,
  children,
  ...props
}) => {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={title && TITLE_HEIGHT}
      {...containerProps}
    >
      {title && (
        <Typography
          position="absolute"
          boxSizing="border-box"
          top={`-${TITLE_HEIGHT}`}
          minWidth="20%"
          padding="0 0.4rem"
          textAlign="center"
          border="2px solid"
          borderRadius="4px"
          borderColor="primary.main"
          bgcolor="secondary.main"
          boxShadow={shadow ? '0 0 10px 0 rgb(66 66 66 / 75%)' : ''}
          fontSize="1.25rem"
          lineHeight="1.2"
          {...titleProps}
        >
          {title}
        </Typography>
      )}
      <Box
        alignSelf="stretch"
        border="2px solid"
        borderColor="primary.main"
        borderRadius="4px"
        bgcolor="secondary.main"
        boxShadow={shadow ? '0 0 10px 0 rgb(66 66 66 / 75%)' : ''}
        {...props}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ParBox;
