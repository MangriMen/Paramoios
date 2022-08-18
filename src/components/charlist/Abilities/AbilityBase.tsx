import { Box, Typography, styled } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface AbilityBaseProps {
  title: string;
  ability: string;
  value: number;
  enabled: boolean;
  shadow?: boolean;
}

const AbilityBaseCell = styled(ParBox)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const AbilityBase: FC<AbilityBaseProps> = ({
  title,
  ability,
  value,
  enabled,
  shadow,
}) => {
  const { t } = useTranslation('data', { keyPrefix: 'abilities' });

  return (
    <Box
      sx={{
        minWidth: '18rem',
        display: 'grid',
        gridTemplateColumns: '2.8rem 2.2rem 12rem',
        columnGap: '0.5rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '1.1rem',
      }}
    >
      <AbilityBaseCell
        shadow={shadow}
        sx={{
          transition: 'filter 0.5s',
          filter: !enabled ? 'brightness(65%)' : '',
          gridColumn: '1',
          zIndex: '1',
        }}
      >
        <Typography
          sx={{
            fontSize: 'inherit',
          }}
        >
          {`${value < 0 ? '' : '+'}${value}`}
        </Typography>
      </AbilityBaseCell>
      <Typography
        sx={{
          gridColumn: '2',
          fontSize: 'inherit',
          textAlign: 'center',
          color: '#606060',
          textTransform: 'uppercase',
        }}
      >
        {ability}
      </Typography>
      <AbilityBaseCell shadow={shadow} sx={{ gridColumn: '3' }}>
        <Typography sx={{ fontSize: 'inherit' }}>{t(title)}</Typography>
      </AbilityBaseCell>
    </Box>
  );
};
