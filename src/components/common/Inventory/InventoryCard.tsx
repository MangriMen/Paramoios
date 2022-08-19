import { Box } from '@mui/material';
import { Inventory } from 'components/charlist/Charlist';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { InventoryItemCard, ItemTypes } from './InventoryItem';
import { InventoryCardProps } from './interfaces';

function getCoordinatesFromPosition(cols: number, position: number) {
  return {
    row: Math.floor(position / cols) + 1,
    col: (position % cols) + 1,
  };
}

function getBounds(cols: number, items: Inventory) {
  const bounds = Object.keys(items).reduce(
    (bounds: { maxRow: number; maxCol: number }, key) => {
      const { row, col } = getCoordinatesFromPosition(cols, Number(key));
      bounds.maxRow = Math.max(bounds.maxRow, row);
      bounds.maxCol = Math.max(bounds.maxCol, col);
      return bounds;
    },
    { maxRow: 0, maxCol: 0 },
  );

  return { maxRow: bounds.maxRow, maxCol: bounds.maxCol };
}

function checkIfGrowIsNeeded(
  rows: number,
  cols: number,
  growDirection: 'vertical' | 'horizontal',
  items: Inventory,
) {
  let itemsInLastRow = 0;
  let itemsInLastCol = 0;
  const cellsCount = rows * cols;

  if (growDirection === 'vertical') {
    for (let i = cellsCount - cols; i <= cellsCount; i++) {
      itemsInLastRow += Number(Boolean(items[i]));
    }
  } else if (growDirection === 'horizontal') {
    for (let i = cols - 1; i <= cellsCount; i += cols) {
      itemsInLastCol += Number(Boolean(items[i]));
    }
  }

  return {
    additionalRows: Number(itemsInLastRow > 0),
    additionalCols: Number(itemsInLastCol > 0),
  };
}

export const InventoryCell: FC<{
  index: number;
  cols: number;
  items: Inventory;
  setItems: any;
}> = ({ index, cols, items, setItems }) => {
  const { row, col } = getCoordinatesFromPosition(cols, index);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.INVENTORY_ITEM,
      drop: (item: { [x: string]: number }) => {
        const newItems = { ...items };
        delete newItems[item.positionIndex];
        setItems({ ...newItems, [index]: items[item.positionIndex] });
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return (
    <Box
      ref={drop}
      gridColumn={col}
      gridRow={row}
      width="3rem"
      height="3rem"
      position="relative"
      boxSizing="border-box"
      sx={{
        borderWidth: items[index] ? '0' : '1px',
        borderStyle: 'solid',
        borderColor: 'primary.main',
        borderRadius: '4px',
        filter: isOver ? 'brightness(200%)' : 'brightness(100%)',
      }}
    >
      {items[index] && (
        <InventoryItemCard data={items[index]} positionIndex={index} />
      )}
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
  items: Inventory,
  setItems: any,
) {
  const tempItems: ReactNode[] = [];
  for (let i = 0; i < cols * rows; i++) {
    tempItems.push(
      <InventoryCell
        key={i}
        index={i}
        cols={cols}
        items={items}
        setItems={setItems}
      />,
    );
  }
  return tempItems;
}

export const InventoryCard: FC<InventoryCardProps> = ({
  items,
  setItems,
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
    const { maxRow, maxCol } = getBounds(gridSize.cols, items);

    const newGridSize = {
      rows: Math.max(gridSize.rows, maxRow),
      cols: Math.max(gridSize.cols, maxCol),
    };

    if (!disableGrow) {
      const { additionalRows, additionalCols } = checkIfGrowIsNeeded(
        newGridSize.rows,
        newGridSize.cols,
        growDirection,
        items,
      );

      newGridSize.rows += additionalRows;
      newGridSize.cols += additionalCols;
    }

    setGridSize({ ...newGridSize });
    setRenderedItems(
      createCells(newGridSize.rows, newGridSize.cols, items, setItems),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, setItems]);

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
