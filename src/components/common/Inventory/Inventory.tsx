import { Box } from '@mui/material';
import { Children, FC, ReactNode, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './InventoryItem';

function getCoordinatesFromPosition(
  rows: number,
  cols: number,
  position: number,
) {
  return {
    row: Math.floor(position / cols) + 1,
    col: (position % cols) + 1,
  };
}

function getItemMapAndBounds(rows: number, cols: number, children: ReactNode) {
  let bounds = { maxRow: 0, maxCol: 0 };

  const itemMap = Children.toArray(children).reduce(
    (map: { [x: string]: any }, child: any) => {
      const { row, col } = getCoordinatesFromPosition(
        rows,
        cols,
        child.props.positionIndex,
      );

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
  let itemsInLastRow = 0;
  let itemsInLastCol = 0;

  if (growDirection === 'vertical') {
    for (let i = 1; i <= cols; i++) {
      itemsInLastRow += Number(Boolean(itemMap[`${rows};${i}`]));
    }
  } else if (growDirection === 'horizontal') {
    for (let i = 1; i <= rows; i++) {
      itemsInLastCol += Number(Boolean(itemMap[`${i};${cols}`]));
    }
  }

  return {
    additionalRows: Number(itemsInLastRow > 0),
    additionalCols: Number(itemsInLastCol > 0),
  };
}

export const InventoryCell: FC<{
  x: number;
  y: number;
  rows: number;
  cols: number;
  children?: ReactNode;
  itemMap: { [x: string]: any };
}> = ({ x, y, rows, cols, itemMap }) => {
  const key = `${y};${x}`;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.INVENTORY_ITEM,
      drop: (item: { [x: string]: number }) => {
        const { row, col } = getCoordinatesFromPosition(
          rows,
          cols,
          item.positionIndex,
        );
        const oldKey = `${row};${col}`;
        delete Object.assign(itemMap, { [key]: itemMap[oldKey] })[oldKey];
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y],
  );

  return (
    <Box
      ref={drop}
      gridColumn={x}
      gridRow={y}
      width="3rem"
      height="3rem"
      position="relative"
      boxSizing="border-box"
      sx={{
        borderWidth: itemMap[key] ? '0' : '1px',
        borderStyle: 'solid',
        borderColor: 'primary.main',
        borderRadius: '4px',
        filter: isOver ? 'brightness(200%)' : 'brightness(100%)',
      }}
    >
      {itemMap[key]}
      {isOver && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: '4px',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'secondary.light',
          }}
        />
      )}
    </Box>
  );
};

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
        <InventoryCell
          rows={rows}
          cols={cols}
          key={key}
          x={i}
          y={j}
          itemMap={itemMap}
        />,
      );
    }
  }

  return tempItems;
}

export const Inventory: FC<{
  rows: number;
  cols: number;
  disableGrow?: boolean;
  growDirection?: 'vertical' | 'horizontal';
  children?: ReactNode;
}> = ({ children, rows, cols, disableGrow, growDirection }) => {
  const [gridSize, setGridSize] = useState<{ rows: number; cols: number }>({
    rows: rows,
    cols: cols,
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
      if (rows === gridSize.rows && cols === gridSize.cols) {
        return;
      }

      setGridSize({ rows, cols });
      setItems(createCells(rows, cols, itemMap));

      return;
    }

    const { additionalRows, additionalCols } = checkIfGrowIsNeeded(
      rows,
      cols,
      growDirection_,
      itemMap,
    );

    if (!additionalRows && !additionalCols) {
      return;
    }

    const newRows = rows + additionalRows;
    const newCols = cols + additionalCols;

    setGridSize({ rows: newRows, cols: newCols });
    setItems(createCells(newRows, newCols, itemMap));
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
};
