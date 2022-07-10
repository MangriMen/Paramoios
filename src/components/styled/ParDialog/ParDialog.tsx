import { BoxProps, Dialog, DialogProps } from '@mui/material';
import { FC } from 'react';

export interface ParDialogProps extends DialogProps {
  themeColor?: BoxProps['color'];
}

export const ParDialog: FC<ParDialogProps> = ({ themeColor, ...props }) => {
  const calculatedColor = themeColor || 'primary';
  const primaryColor = calculatedColor === 'primary' ? 'primary' : 'secondary';
  const secondaryColor = primaryColor === 'primary' ? 'secondary' : 'primary';

  return (
    <Dialog
      sx={{ fontSize: '1.15rem' }}
      PaperProps={{
        sx: {
          backgroundColor: `${primaryColor}.main`,
          color: `${secondaryColor}.main`,
        },
      }}
      {...props}
    ></Dialog>
  );
};
