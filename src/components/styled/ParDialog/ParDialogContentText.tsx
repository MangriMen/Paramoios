import { DialogContentText, DialogContentTextProps } from '@mui/material';
import { FC } from 'react';

export const ParDialogContentText: FC<DialogContentTextProps> = ({
  ...props
}) => {
  return (
    <DialogContentText
      color="rgba(255,255,255,0.85)"
      fontSize="1em"
      {...props}
    />
  );
};
