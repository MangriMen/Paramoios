import { Package } from 'ducks/data/interfaces';

export const defaultPackage: Package['package'] = {
  data: {
    abilities: {
      acrobatics: 'dex',
      animalHandling: 'wis',
      arcana: 'int',
      athletics: 'str',
      deception: 'cha',
      history: 'int',
      insight: 'wis',
      intimidation: 'cha',
      investigation: 'int',
      medicine: 'wis',
      nature: 'int',
      perception: 'wis',
      perfomance: 'cha',
      persuasion: 'cha',
      religion: 'int',
      sleightOfHand: 'dex',
      stealth: 'dex',
      survival: 'wis',
    },
    equipment: {
      money: {
        copper: 0,
        silver: 0,
        electrum: 0,
        gold: 0,
        platinum: 0,
      },
    },
  },
  translation: {
    ru: {
      abilities: {
        acrobatics: 'Акробатика',
        animalHandling: 'Уход за животными',
        arcana: 'Магия',
        athletics: 'Атлетика',
        deception: 'Обман',
        history: 'История',
        insight: 'Проницательность',
        intimidation: 'Запугивание',
        investigation: 'Анализ',
        medicine: 'Медицина',
        nature: 'Природа',
        perception: 'Внимательность',
        perfomance: 'Выступление',
        persuasion: 'Убеждение',
        religion: 'Религия',
        sleightOfHand: 'Ловкость рук',
        stealth: 'Скрытность',
        survival: 'Выживание',
      },
      equipment: {
        money: {
          copper: 'Медь',
          silver: 'Серебро',
          electrum: 'Электрум',
          gold: 'Золото',
          platinum: 'Платина',
        },
      },
    },
  },
  error: '',
};
