import { Box, Popover, Tooltip, Typography } from '@mui/material';
import { Children, FC, ReactNode, useEffect, useState } from 'react';

import ParBox from './ParBox';

export interface ParInventoryItemDataProps {
  name: string;
  description?: string;
}

export interface ParInventoryItemProps {
  icon?: any;
  data: ParInventoryItemDataProps;
  positionIndex: number;
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

export const ParInventoryItem: FC<ParInventoryItemProps> = ({ icon, data }) => {
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
        <ParInventoryItemData {...data} />
      </Popover>
    </>
  );
};

function getItemMapAndBounds(rows: number, cols: number, children: ReactNode) {
  let bounds = { maxRow: 0, maxCol: 0 };

  const itemMap = Children.toArray(children).reduce(
    (map: { [x: string]: any }, child: any) => {
      const row = Math.floor(child.props.positionIndex / cols) + 1;
      const col = (child.props.positionIndex % cols) + 1;

      bounds.maxRow = Math.max(bounds.maxRow, row);
      bounds.maxCol = Math.max(bounds.maxCol, col);

      map[`${row};${col}`] = child;

      return map;
    },
    {},
  );

  return { maxRow: bounds.maxRow, maxCol: bounds.maxCol, itemMap };
}

function checkIfGrowIsNeeded(
  rows: number,
  cols: number,
  growDirection: 'vertical' | 'horizontal',
  itemMap: { [x: string]: any },
) {
  let filledInLastLine = 0;

  if (growDirection === 'vertical') {
    for (let i = 1; i <= cols; i++) {
      filledInLastLine += Number(Boolean(itemMap[`${rows};${i}`]));
    }
  } else if (growDirection === 'horizontal') {
    for (let i = 1; i <= rows; i++) {
      filledInLastLine += Number(Boolean(itemMap[`${i};${cols}`]));
    }
  }

  return Number(filledInLastLine > 0);
}

function createCells(
  rows: number,
  cols: number,
  itemMap: { [x: string]: any },
) {
  const tempItems: ReactNode[] = [];
  for (let i = 1; i <= cols; i++) {
    for (let j = 1; j <= rows; j++) {
      const key = `${j};${i}`;
      tempItems.push(
        <Box
          key={key}
          gridColumn={i}
          gridRow={j}
          width="3rem"
          height="3rem"
          sx={{ border: '1px solid black', borderRadius: '4px' }}
        >
          {itemMap[key] ?? key}
        </Box>,
      );
    }
  }

  return tempItems;
}

export const ParInventory: FC<{
  rows?: number;
  cols?: number;
  disableGrow?: boolean;
  growDirection?: 'vertical' | 'horizontal';
  children?: ReactNode;
}> = ({ children, rows, cols, disableGrow, growDirection }) => {
  const [gridSize, setGridSize] = useState<{ rows: number; cols: number }>({
    rows: rows ?? 2,
    cols: cols ?? 2,
  });

  const growDirection_ = growDirection ?? 'vertical';

  const [items, setItems] = useState<ReactNode[]>();

  useEffect(() => {
    const { maxRow, maxCol, itemMap } = getItemMapAndBounds(
      gridSize.rows,
      gridSize.cols,
      children,
    );

    const rows = Math.max(maxRow, gridSize.rows);
    const cols = Math.max(maxCol, gridSize.cols);

    if (disableGrow) {
      setGridSize((prevState) => ({ ...prevState, rows, cols }));
      setItems([...createCells(rows, cols, itemMap)]);

      return;
    }

    const newRowsOrCols = checkIfGrowIsNeeded(
      rows,
      cols,
      growDirection_,
      itemMap,
    );

    if (growDirection_ === 'vertical') {
      const newRows = rows + newRowsOrCols;
      setGridSize((prevState) => ({ ...prevState, rows: newRows, cols }));
      setItems([...createCells(newRows, cols, itemMap)]);
    } else if (growDirection_ === 'horizontal') {
      const newCols = cols + newRowsOrCols;
      setGridSize((prevState) => ({ ...prevState, rows, newCols }));
      setItems([...createCells(rows, newCols, itemMap)]);
    }
  }, [children, disableGrow, gridSize.cols, gridSize.rows, growDirection_]);

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '1rem',
        justifyItems: 'center',
        aligntItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {items}
    </Box>
  );
  // return <Box sx={{ display: 'grid' }}>{children}</Box>;
};
