import { BoxProps } from '@mui/material';

export interface DiceMenu {
  edges: number;
  iconName: string;
}

export interface RollDiceButtonProps {
  sx?: BoxProps['sx'];
}
