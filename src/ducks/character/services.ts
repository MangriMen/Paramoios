import { CharacterSave } from './interfaces';

export function getCharacterPackagesList({
  packages,
}: CharacterSave): string[] {
  return packages.replace(' ', '').split(',');
}
