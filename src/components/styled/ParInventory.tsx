import { Box, Button, Popover, Tooltip, Typography } from '@mui/material';
import { FC, ReactNode, useState } from 'react';

import ParBox from './ParBox';

export interface ParInventoryItemDataProps {
  name?: string;
  description?: string;
}

export interface ParInventoryItemProps {
  icon?: any;
  tooltip?: any;
  data?: ParInventoryItemDataProps;
}

export const ParInventoryItemData: FC<ParInventoryItemDataProps> = ({
  name,
  description,
}) => {
  return (
    <ParBox padding="0.25rem 0.5rem">
      <Typography fontSize="1.2rem">{name}</Typography>
      <Typography>{description}</Typography>
    </ParBox>
  );
};

export const ParInventoryItem: FC<ParInventoryItemProps> = ({
  icon,
  tooltip,
  data: information,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={tooltip}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClick}
          sx={{
            borderWidth: '4px',
            borderColor: 'primary.main',
            '&:hover': {
              borderWidth: '4px',
            },
            aspectRatio: '1/1',
          }}
        >
          <Box component="img" src={icon ?? ''} />
        </Button>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        <ParInventoryItemData {...information} />
      </Popover>
    </>
  );
};

export const ParInventory: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return <Box>{children}</Box>;
};
