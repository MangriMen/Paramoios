import { Box } from '@mui/material';
import { CoinCard } from 'components/charlist/Equipment/CoinCard';
import { InventoryCard } from 'components/charlist/Equipment/Inventory/InventoryCard';
import ParBox from 'components/styled/ParBox';
import { selectCharacter } from 'ducks/character/selectors';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const MONEY_OFFSET = '1rem';

export const EquipmentCard: FC = () => {
  const character = useSelector(selectCharacter);

  const [renderedMoney, setRenderedMoney] = useState<ReactNode>();

  useEffect(() => {
    setRenderedMoney(
      Object.keys(character.equipment.money).map((key) => (
        <CoinCard key={key} name={key} />
      )),
    );
  }, [character.equipment.money]);

  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: `calc(-${MONEY_OFFSET} - 2.25rem)`,
          display: 'grid',
          rowGap: '0.3rem',
          zIndex: 1,
        }}
      >
        {renderedMoney}
      </Box>
      <ParBox
        shadow
        sx={{
          overflowY: 'auto',
          padding: '0.5rem',
          marginLeft: `calc(${MONEY_OFFSET} + 4rem)`,
        }}
      >
        <InventoryCard rows={4} cols={3} />
      </ParBox>
    </Box>
  );
};
