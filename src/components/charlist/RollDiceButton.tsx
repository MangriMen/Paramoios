import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import D4Icon from 'assets/images/dice/D4.svg';
import D6Icon from 'assets/images/dice/D6.svg';
import D8Icon from 'assets/images/dice/D8.svg';
import D10Icon from 'assets/images/dice/D10.svg';
import D12Icon from 'assets/images/dice/D12.svg';
import D20Icon from 'assets/images/dice/D20.svg';
import D100Icon from 'assets/images/dice/D100.svg';
import { FC } from 'react';
import React from 'react';

import ParBox from '../styled/ParBox';
import { DiceMenu } from './interfaces';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '5',
  marginBottom: '0.5rem',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
  },
}));

const RollDiceButton: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dice: Array<DiceMenu> = [
    {
      name: 'D20',
      iconName: D20Icon,
      onClick: () => {
        handleClose();
      },
    },
    {
      name: 'D12',
      iconName: D12Icon,
      onClick: () => {
        handleClose();
      },
    },
    {
      name: 'D100',
      iconName: D100Icon,
      onClick: () => {
        handleClose();
      },
    },
    {
      name: 'D10',
      iconName: D10Icon,
      onClick: () => {
        handleClose();
      },
    },
    {
      name: 'D8',
      iconName: D8Icon,
      onClick: () => {
        handleClose();
      },
    },
    {
      name: 'D6',
      iconName: D6Icon,
      onClick: () => {
        handleClose();
      },
    },
    {
      name: 'D4',
      iconName: D4Icon,
      onClick: () => {
        handleClose();
      },
    },
  ];

  return (
    <ParBox
      bgcolor="primary.main"
      sx={{
        borderRadius: '50%',
        '&:hover': {
          borderColor: 'primary.light',
          backgroundColor: 'primary.light',
        },
      }}
    >
      <Button
        onClick={handleClick}
        sx={{
          height: '100%',
          borderRadius: '50%',
        }}
      >
        {open ? (
          <CloseIcon fontSize="large" sx={{ color: grey[50] }} />
        ) : (
          <Box component="img" src={D20Icon} />
        )}
      </Button>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {dice.map((dices) => (
          <Tooltip
            disableInteractive
            placement="left"
            key={dices.name}
            title={<Typography> {dices.name || ''} </Typography>}
          >
            <StyledMenuItem onClick={dices.onClick}>
              <Box
                component="img"
                src={dices.iconName}
                width="48px"
                height="48px"
              ></Box>
            </StyledMenuItem>
          </Tooltip>
        ))}
      </StyledMenu>
    </ParBox>
  );
};

export default RollDiceButton;
