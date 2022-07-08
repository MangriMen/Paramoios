import { Box, BoxProps, Typography, styled } from '@mui/material';
import { FC } from 'react';

const DEFAULT_VALUE = 10;
const DEFAULT_MAX_VALUE = 10;
const DEFAULT_HEIGHT = '1.5rem';

const BarParent = styled(Box)(() => ({
  position: 'relative',
  borderRadius: 'inherit',
  width: '100%',
  minHeight: '100%',
}));

const BarChild = styled(Box)(() => ({
  height: 'inherit',
  maxWidth: '100%',
  transition: 'width 0.5s ease-out',
}));

const BarLiquidBlock = styled(Box)(() => ({
  aspectRatio: '1/1',
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

function getCalcStringForWaveLeftOffset(rangedValue: number, waveSize: string) {
  const emptyFillPercent = +(rangedValue <= 0);
  const fullFillPercent = +(rangedValue >= 100);

  return `calc(${rangedValue}% - (${waveSize}) - ${emptyFillPercent}% + ${fullFillPercent}%)`;
}

const LiquidBarBase: FC<LiquidBarProps> = ({
  value,
  maxValue,
  height,
  bgcolor,
}) => {
  const value_ = value ?? DEFAULT_VALUE;
  const maxValue_ = maxValue ?? DEFAULT_MAX_VALUE;
  const height_ = height ?? DEFAULT_HEIGHT;

  const waveHeightPercent = 333;
  const waveWidth = 1;

  const rangedValue = Math.round((value_ * 100) / maxValue_);

  const barWidthPercent = Math.max(rangedValue - waveWidth, 0);
  const wavePositionPercent = getCalcStringForWaveLeftOffset(
    rangedValue,
    `${height_} * ${waveHeightPercent / 100}`,
  );

  return (
    <BarParent
      position="relative"
      display="flex"
      alignItems="center"
      overflow="hidden"
      height={height_}
      bgcolor={bgcolor}
    >
      <BarChild
        width="100%"
        bgcolor="inherit"
        sx={{ filter: 'contrast(65%) brightness(120%)' }}
      />
      <BarChild
        position="absolute"
        top="0"
        width={`${barWidthPercent}%`}
        bgcolor="inherit"
      />
      <BarLiquidBlock
        overflow="hidden"
        position="absolute"
        height={`${waveHeightPercent}%`}
        left={wavePositionPercent}
        bgcolor="inherit"
      />
    </BarParent>
  );
};

const LiquidBar: FC<LiquidBarProps> = ({
  value,
  maxValue,
  height,
  bgcolor,
  ...props
}) => {
  const value_ = value ?? DEFAULT_VALUE;
  const maxValue_ = maxValue ?? DEFAULT_MAX_VALUE;
  const height_ = height ?? DEFAULT_HEIGHT;

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box"
      overflow="hidden"
      height={height_}
      color="white"
      {...props}
    >
      <LiquidBarBase
        bgcolor={bgcolor}
        height={height_}
        value={value}
        maxValue={maxValue}
      />
      <Typography position="absolute" fontSize="inherit">
        {value_}/{maxValue_}
      </Typography>
    </Box>
  );
};

export default LiquidBar;
