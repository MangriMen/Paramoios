import CasinoIcon from '@mui/icons-material/Casino';
import { Button, FormControl, Menu, MenuItem, styled } from '@mui/material';
import React from 'react';

import ParBox from './styled/ParBox';

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
    padding: '0 0.8rem',
  },
}));

function RollDiceButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ParBox
      bgcolor="primary.main"
      sx={{
        borderRadius: '50%',
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ height: '100%', borderRadius: '50%' }}
      />
      <FormControl>
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <StyledMenuItem onClick={handleClose}>
            <CasinoIcon />
          </StyledMenuItem>
        </StyledMenu>
      </FormControl>
    </ParBox>
  );
}

export default RollDiceButton;
