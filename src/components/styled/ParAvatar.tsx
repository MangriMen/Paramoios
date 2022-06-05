import { Avatar, AvatarProps, styled } from '@mui/material';
import { stringAvatar, stringToColor } from 'helpers/avatar';
import { FC } from 'react';

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  border: '4px solid',
  borderColor: theme.palette.primary.main,
}));

const ParAvatar: FC<AvatarProps> = ({ children, sx, ...props }) => {
  return (
    <AvatarStyled
      sx={{
        backgroundColor: stringToColor(children?.toString()),
        ...sx,
      }}
      children={stringAvatar(children?.toString())}
      {...props}
    />
  );
};

export default ParAvatar;
