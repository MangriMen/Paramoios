import { Box } from '@mui/material';
import { AbilityCard } from 'components/charlist/Abilities/AbilityCard';
import { Ability } from 'components/charlist/Charlist';
import { FC, ReactNode, useEffect, useState } from 'react';

export const Abilities: FC<{
  items: { [x: string]: Ability };
  setItems: any;
}> = ({ items, setItems, ...props }) => {
  const [renderedItems, setRenderedItems] = useState<ReactNode>();

  useEffect(() => {
    setRenderedItems(
      Object.keys(items).map((key) => (
        <AbilityCard
          key={key}
          title={key}
          item={items[key]}
          onChange={(item: Ability) => {
            setItems({ ...items, [key]: item });
          }}
        />
      )),
    );
  }, [items, setItems]);

  return <Box {...props}>{renderedItems}</Box>;
};
