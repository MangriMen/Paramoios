import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

const UpDownButton: FC<ButtonProps & { direction: 'up' | 'down' }> = ({
  direction,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      disableElevation
      className=".UpDownButton"
      sx={{
        minWidth: '0',
        minHeight: '0',
        lineHeight: '0px',
        width: '12px',
        height: '8.5px',
        borderRadius: '3px',
        padding: '0',
        borderBottomLeftRadius: direction === 'up' ? '0' : '',
        borderBottomRightRadius: direction === 'up' ? '0' : '',
        borderTopLeftRadius: direction === 'down' ? '0' : '',
        borderTopRightRadius: direction === 'down' ? '0' : '',
        ...sx,
      }}
      {...props}
    >
      {direction === 'up' && <ArrowDropUpIcon sx={{ fontSize: '0.9rem' }} />}
      {direction === 'down' && (
        <ArrowDropDownIcon sx={{ fontSize: '0.9rem' }} />
      )}
    </Button>
  );
};

export default UpDownButton;
