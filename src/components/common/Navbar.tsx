import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  styled,
} from '@mui/material';
import ParAvatar from 'components/styled/ParAvatar';
import ParLink from 'components/styled/ParLink';
import { ROUTE } from 'consts';
import { logoutRequest } from 'ducks/auth';
import { selectIsLogged } from 'ducks/auth/selectors';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectUser } from '../../ducks/user/selectors';

interface UserMenuItem {
  name: string;
  icon: JSX.Element;
  tooltip?: string;
  onClick: () => void;
}

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    padding: '0 0.8rem',
  },
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  border: '0.2rem solid',
  borderColor: theme.palette.primary.main,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: '5',
  marginBottom: '0.5rem',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Navbar: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });
  const { t: tAuth } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const isLogged = useSelector(selectIsLogged);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isLogged) {
      setAnchorElUser(event.currentTarget);
    } else {
      navigate(ROUTE.AUTH);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userSettings: Array<UserMenuItem> = [
    {
      name: 'Profile',
      icon: <PersonIcon sx={{ color: '#ffffff' }} />,
      tooltip: t('profile'),
      onClick: () => {
        handleCloseUserMenu();
        navigate(ROUTE.ME);
      },
    },
    {
      name: 'Logout',
      icon: <LogoutIcon sx={{ color: '#ffffff' }} />,
      tooltip: tAuth('signOut'),
      onClick: () => {
        handleCloseUserMenu();
        dispatch(logoutRequest());
        navigate(ROUTE.HOME);
      },
    },
  ];

  return (
    <AppBar position="static" sx={{ maxHeight: '2rem' }}>
      <Container maxWidth="lg" sx={{ maxHeight: 'inherit' }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: {
              xs: '0',
              sm: '0',
            },
            maxHeight: 'inherit',
            justifyContent: 'space-between',
          }}
        >
          <ParLink
            component="button"
            fontSize="1rem"
            fontWeight="500"
            sx={{ color: '#FFFFFF' }}
            onClick={() => navigate('/')}
          >
            Paramoios
          </ParLink>
          <Box>
            <Tooltip
              disableInteractive
              sx={{
                mt: '1.6rem',
              }}
              title={isLogged ? t('menu') : tAuth('signIn')}
            >
              <IconButton onClick={handleOpenUserMenu}>
                <ParAvatar
                  src={user.avatar}
                  sx={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  {user.username || undefined}
                </ParAvatar>
              </IconButton>
            </Tooltip>
            <StyledMenu
              sx={{
                mt: '2.6rem',
              }}
              keepMounted
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map((setting) => (
                <Tooltip
                  disableInteractive
                  placement="left"
                  key={setting.name}
                  title={setting.tooltip || ''}
                >
                  <StyledMenuItem onClick={setting.onClick}>
                    {setting.icon}
                  </StyledMenuItem>
                </Tooltip>
              ))}
            </StyledMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
