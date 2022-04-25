import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Link,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { auth } from "helpers/firebase";
// import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "ducks/auth";
import { getIsLogged } from "ducks/auth/selectors";

interface IUserMenuItem {
  name: string;
  icon: JSX.Element;
  onClick: () => void;
}

function NavbarComponent() {
  //   const { t } = useTranslation("translation");
  const theme = useTheme();

  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const isLogged = useSelector(getIsLogged);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isLogged) {
      setAnchorElUser(event.currentTarget);
    } else {
      navigate("/auth");
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userSettings: Array<IUserMenuItem> = [
    {
      name: "Profile",
      icon: <PersonIcon sx={{ color: "#ffffff" }} />,
      onClick: () => {
        handleCloseUserMenu();
        navigate("/user");
      },
    },
    {
      name: "Logout",
      icon: <LogoutIcon sx={{ color: "#ffffff" }} />,
      onClick: () => {
        handleCloseUserMenu();
        dispatch(authSlice.actions.logout());
        navigate("/");
      },
    },
  ];

  return (
    <AppBar position="static" sx={{ maxHeight: "2rem" }}>
      <Container maxWidth="lg" sx={{ maxHeight: "inherit" }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: {
              xs: "0",
              sm: "0",
            },
            maxHeight: "inherit",
            justifyContent: "space-between",
          }}
        >
          <Link
            component="button"
            sx={{ color: "#FFFFFF", userSelect: "none", cursor: "" }}
            fontSize="1rem"
            fontWeight="500"
            variant="button"
            underline="none"
            onClick={() => navigate("/")}
          >
            Paramoios
          </Link>
          <Box zIndex="100" sx={{ flexGrow: 0 }}>
            <Tooltip
              sx={{
                mt: {
                  sm: "1.6rem",
                  lg: "1.6rem",
                },
              }}
              title="Open settings"
            >
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  sx={{
                    width: "48px",
                    height: "48px",
                    border: "4px solid",
                    borderColor: theme.palette.primary.main,
                  }}
                >
                  {auth.currentUser?.displayName}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(0, 0, 0, 0)", // fixed menu transparent
                  boxShadow: "none",
                  padding: "0 0.8rem",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={setting.onClick}
                  sx={{
                    padding: "0.5rem",
                    backgroundColor: theme.palette.secondary.main,
                    border: "3px solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "50%",
                    boxShadow: "5",
                    marginBottom: "0.5rem",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {setting.icon}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent;
