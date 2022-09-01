import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

const HealthButton: FC<ButtonProps> = ({ sx, ...props }) => {
  return (
    <Button
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        border: '2px solid',
        fontSize: '1rem',
        '&:hover': {
          border: '2px solid',
          filter: 'saturate(140%)',
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default HealthButton;
