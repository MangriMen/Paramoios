import { Box } from '@mui/material';
import { getCoordinates } from 'components/charlist/Equipment/Inventory/InventoryCard';
import {
  InventoryItemCard,
  ItemTypes,
} from 'components/charlist/Equipment/Inventory/InventoryItem';
import { setInventoryItem } from 'ducks/character';
import { selectCharacter } from 'ducks/character/selectors';
import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

export const InventoryCell: FC<{
  index: number;
  cols: number;
}> = ({ index, cols }) => {
  const dispatch = useDispatch();
  const character = useSelector(selectCharacter);

  const { row, col } = getCoordinates(cols, index);

  const [{ ableToDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.INVENTORY_ITEM,
      drop: (item: { [x: string]: number }) => {
        const tempItem = character.equipment.inventory[item.positionIndex];
        dispatch(setInventoryItem({ index: item.positionIndex, value: null }));
        dispatch(setInventoryItem({ index, value: tempItem }));
      },
      canDrop: () => !character.equipment.inventory[index],
      collect: (monitor) => ({
        ableToDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [character.equipment.inventory],
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
        borderWidth: character.equipment.inventory[index] ? '0' : '1px',
        borderStyle: 'solid',
        borderColor: 'primary.main',
        borderRadius: '4px',
        backgroundColor: isOver && ableToDrop ? 'primary.main' : '',
        filter: isOver && ableToDrop ? 'brightness(120%)' : 'brightness(100%)',
      }}
    >
      {character.equipment.inventory[index] && (
        <InventoryItemCard
          data={character.equipment.inventory[index]}
          positionIndex={index}
        />
      )}
      {isOver && ableToDrop && (
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
