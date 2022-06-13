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
import ParBox from 'components/styled/ParBox';
import { FC } from 'react';
import React from 'react';

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

  const dices: Array<DiceMenu> = [
    {
      edges: 20,
      iconName: D20Icon,
    },
    {
      edges: 12,
      iconName: D12Icon,
    },
    {
      edges: 100,
      iconName: D100Icon,
    },
    {
      edges: 10,
      iconName: D10Icon,
    },
    {
      edges: 8,
      iconName: D8Icon,
    },
    {
      edges: 6,
      iconName: D6Icon,
    },
    {
      edges: 4,
      iconName: D4Icon,
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
        {dices.map((dice) => (
          <Tooltip
            disableInteractive
            placement="left"
            key={dice.edges}
            title={<Typography> {`D ${dice.edges}`} </Typography>}
          >
            <StyledMenuItem onClick={handleClose}>
              <Box
                component="img"
                src={dice.iconName}
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
