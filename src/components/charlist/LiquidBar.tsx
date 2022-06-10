import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
  styled,
} from '@mui/material';
import { FC } from 'react';

const LinearProgressStyled = styled(LinearProgress)(({ theme }) => ({
  height: '1.5rem',
  borderRadius: '4px',
}));

const LiquidBar: FC<LinearProgressProps & { maxValue?: number }> = ({
  maxValue,
  value,
  ...props
}) => {
  const maxValue_ = maxValue || 100;
  const value_ = value || 10;

  return (
    <Box position="relative">
      <LinearProgressStyled
        variant="determinate"
        value={Math.round((value_ * 100) / maxValue_)}
        {...props}
      />
      <Typography
        position="absolute"
        sx={{
          color: '#FFF',
          top: '0',
          left: '0',
          right: '0',
          textAlign: 'center',
        }}
      >
        {value_}/{maxValue_}
      </Typography>
    </Box>
  );
};

export default LiquidBar;
