import { DialogTitle, DialogTitleProps } from '@mui/material';
import { FC } from 'react';

export const ParDialogTitle: FC<DialogTitleProps> = ({ ...props }) => {
  return <DialogTitle color="white" fontSize="1.25em" {...props} />;
};
