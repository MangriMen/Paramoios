import { Box } from '@mui/material';
import { AbilityCard } from 'components/charlist/Abilities/AbilityCard';
import { selectCharacter } from 'ducks/character/selectors';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Abilities: FC<{}> = ({ ...props }) => {
  const character = useSelector(selectCharacter);

  const [renderedItems, setRenderedItems] = useState<ReactNode>();

  useEffect(() => {
    setRenderedItems(
      Object.keys(character.abilities).map((key) => (
        <AbilityCard key={key} name={key} />
      )),
    );
  }, [character.abilities]);

  return <Box {...props}>{renderedItems}</Box>;
};
