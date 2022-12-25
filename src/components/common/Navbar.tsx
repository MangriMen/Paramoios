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
import { selectUser } from 'ducks/user/selectors';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Navbar: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });
  const { t: tAuth } = useTranslation('translation', { keyPrefix: 'auth' });
  const { t: tUserProfile } = useTranslation('translation', {
    keyPrefix: 'userProfile',
  });

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

  const [userSettings] = useState<Array<UserMenuItem>>([
    {
      name: 'Profile',
      icon: <PersonIcon />,
      tooltip: t('profile'),
      onClick: () => {
        handleCloseUserMenu();
        navigate(ROUTE.ME);
      },
    },
    {
      name: 'Logout',
      icon: <LogoutIcon />,
      tooltip: tAuth('signOut'),
      onClick: () => {
        handleCloseUserMenu();
        dispatch(logoutRequest());
      },
    },
  ]);

  const [styledMenuItems, setStyledMenuItems] = useState<ReactNode>();

  useEffect(() => {
    setStyledMenuItems(
      userSettings.map((setting) => (
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
      )),
    );
  }, [userSettings]);

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
            component={RouterLink}
            fontSize="1rem"
            fontWeight="500"
            sx={{ color: 'primary.contrastText' }}
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
                  alt={tUserProfile('avatar')}
                  key={user.avatar}
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
              keepMounted
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 8,
                horizontal: 'center',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {styledMenuItems}
            </StyledMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
