import { SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import ParBox from 'components/styled/ParBox';
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

      if (query.target.valueAsNumber > 999999) {
        query.target.valueAsNumber = 999999;
      }

      if (isNaN(query.target.valueAsNumber)) {
        query.target.valueAsNumber = 0;
      }

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
        <form>
          <TextField
            type="number"
            defaultValue={character.equipment.money[name]}
            onChange={handleTextFieldChange}
            inputProps={{
              maxLength: 6,
              min: 0,
              max: 999999,
              sx: {
                padding: '0.2rem',
                textAlign: 'center',
                height: '0.8rem',
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
        </form>
      </ParBox>
    </Tooltip>
  );
};
