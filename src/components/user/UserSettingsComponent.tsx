import { Box, Button, Container, TextField, useTheme } from '@mui/material';
import { updateUser } from 'ducks/user';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface activeButtons {
  userName: boolean;
  email: boolean;
  password: boolean;
}

export const UserSettingsComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [buttons, setButtons] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const handleChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    setUserInfo((prevState) => ({ ...prevState, [name]: event.target.value }));
  };

  const handleClick = (event: any) => {
    const target = event.target;
    const name = target.name;
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      [name]: !prevState[name as keyof activeButtons],
    }));
    setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        [name]: false,
      }));
    }, 5000);
    dispatch(updateUser({ userInfo, name }));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: '1rem',
        border: '4px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          mt: '1rem',
          mb: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Button
          sx={{
            width: '200px',
            height: '200px',
            border: '4px solid',
            borderRadius: '4px',
            borderColor: theme.palette.primary.main,
            fontSize: '20px',
          }}
        >
          Change avatar
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            ml: '1rem',
            mr: '1rem',
            fontSize: {
              lg: '32px',
              xs: '28px',
            },
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              label="New name"
              type="name"
              value={userInfo.userName}
              name="userName"
              onChange={handleChange}
            />
            <Button
              name="userName"
              onClick={handleClick}
              disabled={buttons.userName}
            >
              Change name
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              label="New email"
              type="email"
              value={userInfo.email}
              name="email"
              onChange={handleChange}
            />
            <Button name="email" onClick={handleClick} disabled={buttons.email}>
              Change email
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              label="New password"
              type="password"
              value={userInfo.password}
              name="password"
              onChange={handleChange}
            />
            <Button
              name="password"
              onClick={handleClick}
              disabled={buttons.password}
            >
              Change password
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
