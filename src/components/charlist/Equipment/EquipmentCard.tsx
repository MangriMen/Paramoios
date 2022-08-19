import { Box } from '@mui/material';
import { Character, Equipment } from 'components/charlist/Charlist';
import { CoinCard } from 'components/charlist/Equipment/CoinCard';
import { InventoryCard } from 'components/charlist/Equipment/Inventory/InventoryCard';
import ParBox from 'components/styled/ParBox';
import { FC, ReactNode, useEffect, useState } from 'react';

export const MONEY_OFFSET = '3.25rem';

export const EquipmentCard: FC<{ items: Equipment; setItems: any }> = ({
  items,
  setItems,
}) => {
  const setInventory = (newInventory: Character['equipment']['inventory']) => {
    setItems({ ...items, inventory: newInventory });
  };

  const [renderedMoney, setRenderedMoney] = useState<ReactNode>();

  useEffect(() => {
    const setMoney = (newMoney: Character['equipment']['money']) => {
      setItems({ ...items, money: newMoney });
    };

    setRenderedMoney(
      Object.keys(items.money).map((key) => (
        <CoinCard
          key={key}
          name={key}
          items={items.money}
          setItems={setMoney}
        />
      )),
    );
  }, [items, items.money, setItems]);

  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      <Box
        sx={{
          position: 'absolute',
          width: '6rem',
          top: 0,
          left: `-${MONEY_OFFSET}`,
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
          marginLeft: `calc(${MONEY_OFFSET} + 1rem)`,
        }}
      >
        <InventoryCard
          items={items.inventory}
          setItems={setInventory}
          rows={4}
          cols={3}
        />
      </ParBox>
    </Box>
  );
};
