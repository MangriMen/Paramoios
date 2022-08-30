import { Box } from '@mui/material';
import { Inventory } from 'components/charlist/Charlist';
import { InventoryCell } from 'components/charlist/Equipment/Inventory/InventoryCell';
import { InventoryCardProps } from 'components/charlist/Equipment/Inventory/interfaces';
import { selectCharacter } from 'ducks/character/selectors';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function getCoordinates(cols: number, position: number) {
  return {
    row: Math.floor(position / cols) + 1,
    col: (position % cols) + 1,
  };
}

function getBounds(cols: number, items: Inventory) {
  return Object.keys(items).reduce(
    (bounds: { maxRow: number; maxCol: number }, key) => {
      const { row, col } = getCoordinates(cols, Number(key));
      bounds.maxRow = Math.max(bounds.maxRow, row);
      bounds.maxCol = Math.max(bounds.maxCol, col);
      return bounds;
    },
    { maxRow: 0, maxCol: 0 },
  );
}

function checkIfGrowIsNeeded(
  rows: number,
  cols: number,
  growDirection: 'vertical' | 'horizontal',
  items: Inventory,
) {
  const cellsCount = rows * cols;

  let itemsInLastRow = 0;
  let itemsInLastCol = 0;

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

export const InventoryCard: FC<InventoryCardProps> = ({
  rows,
  cols,
  disableGrow,
  growDirection = 'vertical',
}) => {
  const character = useSelector(selectCharacter);

  const [gridSize, setGridSize] = useState<{ rows: number; cols: number }>({
    rows: rows,
    cols: cols,
  });

  const [renderedItems, setRenderedItems] = useState<ReactNode>();

  useEffect(() => {
    const { maxRow, maxCol } = getBounds(
      gridSize.cols,
      character.equipment.inventory,
    );

    const newGridSize = {
      rows: Math.min(Math.max(rows, maxRow), gridSize.rows),
      cols: Math.min(Math.max(cols, maxCol), gridSize.cols),
    };

    if (!disableGrow) {
      const { additionalRows, additionalCols } = checkIfGrowIsNeeded(
        newGridSize.rows,
        newGridSize.cols,
        growDirection,
        character.equipment.inventory,
      );

      newGridSize.rows += additionalRows;
      newGridSize.cols += additionalCols;
    }

    setGridSize(newGridSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, disableGrow, growDirection, character.equipment.inventory]);

  useEffect(() => {
    setRenderedItems(
      Array.from(Array(gridSize.rows * gridSize.cols)).map((_, index) => (
        <InventoryCell key={index} index={index} cols={gridSize.cols} />
      )),
    );
  }, [gridSize.rows, gridSize.cols]);

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
