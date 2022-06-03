import { Avatar, AvatarProps, styled } from '@mui/material';
import { stringAvatar, stringToColor } from 'helpers/avatar';

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  border: '4px solid',
  borderColor: theme.palette.primary.main,
}));

function ParAvatar({ children, sx, ...props }: AvatarProps) {
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
}

export default ParAvatar;
