import { Box } from '@mui/material';
import { Children, FC, ReactNode, useEffect, useState } from 'react';

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

export const Inventory: FC<{
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
