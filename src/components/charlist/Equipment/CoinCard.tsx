import { Box, SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Money } from '../Charlist';

export const CoinCard: FC<{
  name: string;
  icon?: string;
  items: Money;
  setItems: any;
}> = ({ name, icon, items, setItems }) => {
  const { t: tMoney } = useTranslation('translation', {
    keyPrefix: 'equipment.money',
  });

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItems({ ...items, [name]: event.target.value });
  };

  return (
    <Tooltip
      title={<Typography>{tMoney(name)}</Typography>}
      disableInteractive
      arrow
      placement="left"
    >
      <Box
        sx={{
          height: '2.5rem',
        }}
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
            onChange={handleTextFieldChange}
            inputProps={{
              maxLength: 6,
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
              width: '4rem',
            }}
            defaultValue={items[name]}
          />
        </ParBox>
      </Box>
    </Tooltip>
  );
};
