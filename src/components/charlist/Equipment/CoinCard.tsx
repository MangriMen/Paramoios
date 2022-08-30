import { SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { COINS } from 'consts';
import { setCoin } from 'ducks/character';
import { selectCharacter } from 'ducks/character/selectors';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const CoinCard: FC<{
  name: string;
  icon?: string;
}> = ({ name, icon }) => {
  const dispatch = useDispatch();

  const { t: tMoney } = useTranslation('translation', {
    keyPrefix: 'equipment.money',
  });

  const character = useSelector(selectCharacter);

  const [query, setQuery] = useState<ChangeEvent<HTMLInputElement>>();

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query === undefined) {
        return;
      }

      if (isNaN(query.target.valueAsNumber)) {
        query.target.valueAsNumber = 0;
      }

      query.target.valueAsNumber = Math.max(
        Math.min(query.target.valueAsNumber, COINS.MAX),
        COINS.MIN,
      );

      dispatch(setCoin({ name, value: query.target.valueAsNumber }));
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [dispatch, name, query]);

  return (
    <Tooltip
      title={<Typography>{tMoney(name)}</Typography>}
      disableInteractive
      arrow
      placement="left"
    >
      <ParBox
        shadow
        sx={{
          height: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0.2rem',
          boxSizing: 'border-box',
        }}
      >
        {icon && <SvgIcon />}
        {!icon && (
          <Typography
            sx={{
              cursor: 'default',
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: '50%',
              color: '#212121',
              lineHeight: '1',
              width: '1.5rem',
              height: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              marginRight: '0.4rem',
            }}
          >
            {tMoney(name).toUpperCase().charAt(0)}
          </Typography>
        )}
        <TextField
          type="number"
          defaultValue={character.equipment.money[name]}
          onChange={handleTextFieldChange}
          inputProps={{
            min: COINS.MIN,
            max: COINS.MAX,
            sx: {
              padding: '0.2rem',
              textAlign: 'center',
              height: '0.8rem',
              // @TODO
              // '&': {
              //   '-webkit-appearance': 'textfield',
              //   '-moz-appearance': 'textfield',
              //   appearance: 'textfield',
              // },
              // '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
              //   '-webkit-appearance': 'none',
              // },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                transition: 'border 0.1s ease-out',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'transparent',
              },
              '&:hover fieldset, &.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            minHeight: '0',
            width: '5rem',
          }}
        />
      </ParBox>
    </Tooltip>
  );
};
