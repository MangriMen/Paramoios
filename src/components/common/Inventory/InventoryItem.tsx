import { Box, Popover, Tooltip, Typography } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { FC, useState } from 'react';

export interface InventoryItemDataProps {
  name: string;
  description?: string;
}

export interface InventoryItemProps {
  icon?: any;
  data: InventoryItemDataProps;
  positionIndex: number;
}

export const InventoryItemPopover: FC<InventoryItemDataProps> = ({
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

export const InventoryItem: FC<InventoryItemProps> = ({ icon, data }) => {
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
      <Tooltip
        title={<Typography fontSize="0.9rem">{data.name ?? ''}</Typography>}
        disableInteractive
      >
        <Box
          component="button"
          onClick={handleClick}
          sx={{
            width: 'inherit',
            backgroundColor: 'secondary.main',
            borderRadius: '4px',
            borderStyle: 'solid',
            borderWidth: '4px',
            borderColor: 'primary.main',
            cursor: 'pointer',
            height: '3rem',
            aspectRatio: '1/1',
          }}
        >
          {icon ? (
            <Box component="img" src={icon ?? ''} />
          ) : (
            <Typography
              color="primary"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {data.name}
            </Typography>
          )}
        </Box>
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
        <InventoryItemPopover {...data} />
      </Popover>
    </>
  );
};
