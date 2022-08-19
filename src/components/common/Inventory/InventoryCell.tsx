import { Box } from '@mui/material';
import { Inventory } from 'components/charlist/Charlist';
import { getCoordinates } from 'components/common/Inventory/InventoryCard';
import {
  InventoryItemCard,
  ItemTypes,
} from 'components/common/Inventory/InventoryItem';
import { FC } from 'react';
import { useDrop } from 'react-dnd';

export const InventoryCell: FC<{
  index: number;
  cols: number;
  items: Inventory;
  setItems: any;
}> = ({ index, cols, items, setItems }) => {
  const { row, col } = getCoordinates(cols, index);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.INVENTORY_ITEM,
      drop: (item: { [x: string]: number }) => {
        const newItems = { ...items };
        delete newItems[item.positionIndex];
        setItems({ ...newItems, [index]: items[item.positionIndex] });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
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
