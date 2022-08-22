import { Box, BoxProps, Typography } from '@mui/material';
import { FC } from 'react';

interface ParBoxProps extends BoxProps {
  title?: string;
  shadow?: boolean;
}

const TITLE_HEIGHT = '0.9rem';

const ParBox: FC<ParBoxProps> = ({ title, shadow, children, ...props }) => {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius={props.borderRadius || '4px'}
      marginTop={title && TITLE_HEIGHT}
      minHeight={props.minHeight}
      height={props.height}
      maxHeight={props.maxHeight}
      minWidth={props.minWidth}
      width={props.width}
      maxWidth={props.maxWidth}
    >
      {title && (
        <Typography
          boxSizing="border-box"
          position="absolute"
          top={`-${TITLE_HEIGHT}`}
          minWidth="20%"
          padding="0 0.4rem"
          textAlign="center"
          border="2px solid"
          borderRadius="4px"
          borderColor="primary.main"
          bgcolor="secondary.main"
          boxShadow={shadow ? '0 0 10px 0 rgb(66 66 66 / 75%)' : ''}
        >
          {title}
        </Typography>
      )}
      <Box
        alignSelf="stretch"
        border="2px solid"
        borderRadius="4px"
        borderColor="primary.main"
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
