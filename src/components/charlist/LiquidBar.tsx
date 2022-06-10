import { Box, BoxProps, Typography, styled } from '@mui/material';
import { FC } from 'react';

const BarParent = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  width: '100%',
  minHeight: '100%',
}));

const BarChild = styled(Box)(({ theme }) => ({
  borderRadius: 'inherit',
  height: 'inherit',
  maxWidth: '100%',
  transition: 'width 0.5s ease-out',
}));

const BarLiquidBlock = styled(Box)(({ theme }) => ({
  borderRadius: '40%',
  transition: 'left 0.5s ease-out',
  animation: 'wave 8s linear infinite',
  '@keyframes wave': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

type LiquidBarProps = BoxProps & {
  value?: number;
  maxValue?: number;
};

const LiquidBarBase: FC<LiquidBarProps> = ({
  value,
  maxValue,
  height,
  bgcolor,
}) => {
  const value_ = value ?? 10;
  const maxValue_ = maxValue ?? 100;
  const height_ = height ?? '1.5rem';
  const bgcolor_ = bgcolor ?? 'primary.main';

  const nonNegativeValueForFilledBar = value_ - 2 >= 0 ? value_ - 2 : 0;
  const filledBarWidth = Math.round(
    (nonNegativeValueForFilledBar * 100) / maxValue_,
  );

  const waveOffset = Math.round((value_ * 100) / maxValue_);

  return (
    <BarParent position="relative" overflow="hidden" height={height_}>
      <BarChild
        bgcolor={bgcolor_}
        sx={{ filter: 'contrast(65%) brightness(120%)' }}
      />
      <BarChild
        position="absolute"
        top="0"
        bgcolor={bgcolor_}
        width={`${filledBarWidth}%`}
      />
      <BarLiquidBlock
        bgcolor={bgcolor_}
        position="absolute"
        width="6rem"
        height="6rem"
        top="-160%"
        left={`calc(${waveOffset}% - 6.${value_ > 0 ? '0' : '3'}rem)`}
      />
    </BarParent>
  );
};

const LiquidBar: FC<LiquidBarProps> = ({
  value,
  maxValue,
  height,
  fontSize,
  ...props
}) => {
  const value_ = value ?? 10;
  const maxValue_ = maxValue ?? 100;
  const height_ = height ?? '1.5rem';

  return (
    <Box
      position="relative"
      height={height_}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <LiquidBarBase height="inherit" value={value} maxValue={maxValue} />
      <Typography
        position="absolute"
        fontSize={fontSize ?? height ?? 'inherit'}
        sx={{
          color: '#FFF',
        }}
      >
        {value_}/{maxValue_}
      </Typography>
    </Box>
  );
};

export default LiquidBar;
