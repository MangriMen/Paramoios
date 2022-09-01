import { Box, Button, Grid, Popper } from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LiquidBar from '../LiquidBar';
import HealthButton from './HealthButton';

const HealthCard: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'healthcard' });

  const [editing, setEditing] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | undefined | HTMLElement>(
    null,
  );

  const [localOverride, setLocalOverride] = useState<number>(0);
  const [localEnabled, setLocalEnabled] = useState<boolean>(false);

  const confirmChanges = () => {
    // if (onChange) {
    //   //onChange({ ...item, enabled: localEnabled, override: localOverride });
    // }
  };

  const discardChanges = () => {
    //setLocalOverride(item.override);
    //setLocalEnabled(item.enabled);
  };

  const handleEditDone = () => {
    setEditing(!editing);

    if (editing) {
      //confirmChanges();
    }
  };

  const handleEditCancel = () => {
    setEditing(!editing);

    if (editing) {
      //discardChanges();
    }
  };

  const parentRef = useRef();

  useEffect(() => {
    setAnchorEl(parentRef.current);
  }, [parentRef]);

  return (
    <Box ref={parentRef} position="relative">
      <Popper
        open={editing}
        anchorEl={anchorEl}
        modifiers={[
          {
            name: 'offset',
            enabled: true,
            options: {
              offset: parentRef,
            },
          },
        ]}
      >
        <ParBox width="200px" height="200px"></ParBox>
      </Popper>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        columns={13}
        columnSpacing={2}
        rowSpacing={1}
      >
        <Grid item xs={14}>
          <ParBox border="none" shadow>
            <LiquidBar
              border="2px solid"
              borderRadius="4px"
              height="2.375rem"
              borderColor="primary.main"
              fontSize="1.2rem"
              bgcolor="#b5353b"
              waveColor="#b5353b"
              value={5}
              maxValue={10}
            />
          </ParBox>
        </Grid>
        <Grid item xs={5}>
          <ParBox border="none" shadow>
            <HealthButton onClick={handleEditCancel}>
              {t('damage')}
            </HealthButton>
          </ParBox>
        </Grid>
        <Grid item xs={3}>
          <ParBox border="none" shadow>
            <HealthButton>{t('tmp')}</HealthButton>
          </ParBox>
        </Grid>
        <Grid item xs={5}>
          <ParBox border="none" shadow>
            <HealthButton>{t('heal')}</HealthButton>
          </ParBox>
        </Grid>
        <Grid item xs={14}>
          <ParBox border="none" shadow>
            <HealthButton>{t('hitDicesLeft')}</HealthButton>
          </ParBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthCard;
