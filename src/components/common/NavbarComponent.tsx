import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useTheme,
} from '@mui/material';
import { ROUTE } from 'consts';
import { authSlice } from 'ducks/auth';
import { getIsLogged } from 'ducks/auth/selectors';
import { stringAvatar, stringToColor } from 'helpers/avatar';
import { auth } from 'helpers/firebase';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface IUserMenuItem {
  name: string;
  icon: JSX.Element;
  tooltip?: string;
  onClick: () => void;
}

function NavbarComponent() {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });
  const { t: tAuth } = useTranslation('translation', { keyPrefix: 'auth' });

  const theme = useTheme();

  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const isLogged = useSelector(getIsLogged);

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

  const userSettings: Array<IUserMenuItem> = [
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
        dispatch(authSlice.actions.logout());
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
          <Link
            component="button"
            sx={{ color: '#FFFFFF', userSelect: 'none', cursor: '' }}
            fontSize="1rem"
            fontWeight="500"
            variant="button"
            underline="none"
            onClick={() => navigate('/')}
          >
            Paramoios
          </Link>
          <Box zIndex="100" sx={{ flexGrow: 0 }}>
            <Tooltip
              disableInteractive
              sx={{
                mt: {
                  sm: '1.6rem',
                  lg: '1.6rem',
                },
              }}
              title={isLogged ? t('menu') : tAuth('signIn')}
            >
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  sx={{
                    backgroundColor: stringToColor(
                      auth?.currentUser?.displayName,
                    ),
                    width: '48px',
                    height: '48px',
                    border: '4px solid',
                    borderColor: theme.palette.primary.main,
                  }}
                  children={stringAvatar(auth?.currentUser?.displayName)}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px',
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0)', // fixed menu transparent
                  boxShadow: 'none',
                  padding: '0 0.8rem',
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
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
                  title={setting.tooltip || ''}
                >
                  <MenuItem
                    key={setting.name}
                    onClick={setting.onClick}
                    sx={{
                      padding: '0.5rem',
                      backgroundColor: theme.palette.secondary.main,
                      border: '3px solid',
                      borderColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      boxShadow: '5',
                      marginBottom: '0.5rem',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {setting.icon}
                  </MenuItem>
                </Tooltip>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent;
