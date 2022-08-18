import { Box } from '@mui/material';
import { Inventory } from 'components/charlist/Charlist';
import { Children, FC, ReactNode, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from './InventoryItem';
import { InventoryCardProps } from './interfaces';

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

function getItemMapAndBounds(rows: number, cols: number, items: Inventory) {
  const bounds = { maxRow: 0, maxCol: 0 };

  const itemMap = Object.keys(items).reduce(
    (itemMap: { [x: string]: any }, key) => {
      const { row, col } = getCoordinatesFromPosition(rows, cols, Number(key));

      bounds.maxRow = Math.max(bounds.maxRow, row);
      bounds.maxCol = Math.max(bounds.maxCol, col);

      itemMap[`${row};${col}`] = items[Number(key)];

      return itemMap;
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

export const InventoryCard: FC<InventoryCardProps> = ({
  items,
  rows,
  cols,
  disableGrow,
  growDirection = 'vertical',
}) => {
  const [gridSize, setGridSize] = useState<{ rows: number; cols: number }>({
    rows: rows,
    cols: cols,
  });

  const [renderedItems, setRenderedItems] = useState<ReactNode>();

  useEffect(() => {
    const { maxRow, maxCol, itemMap } = getItemMapAndBounds(
      gridSize.rows,
      gridSize.cols,
      items,
    );

    const rows = Math.max(gridSize.rows, maxRow);
    const cols = Math.max(gridSize.cols, maxCol);

    if (disableGrow) {
      if (rows === gridSize.rows && cols === gridSize.cols) {
        return;
      }

      setGridSize({ rows, cols });
      setRenderedItems(createCells(rows, cols, itemMap));

      return;
    }

    const { additionalRows, additionalCols } = checkIfGrowIsNeeded(
      rows,
      cols,
      growDirection,
      itemMap,
    );

    if (!additionalRows && !additionalCols) {
      return;
    }

    const newRows = rows + additionalRows;
    const newCols = cols + additionalCols;

    setGridSize({ rows: newRows, cols: newCols });
    setRenderedItems(createCells(newRows, newCols, itemMap));
  }, [items, gridSize.cols, gridSize.rows]);

  // console.log(renderedItems);

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
      {renderedItems}
    </Box>
  );
};
