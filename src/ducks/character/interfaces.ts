import { Character } from 'components/charlist/Charlist';

export interface CharacterSave {
  packages: string;
  character: Character;
}

export interface CharacterState {
  isLoading: boolean;
  error: string;
  packages: CharacterSave['packages'];
  character: CharacterSave['character'];
}
