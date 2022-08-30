import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  IconButton,
  IconButtonProps,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { AbilityBase } from 'components/charlist/Abilities/AbilityBase';
import ParBox from 'components/styled/ParBox';
import { ABILITY_BONUS } from 'consts';
import { setAbility } from 'ducks/character';
import { selectCharacter } from 'ducks/character/selectors';
import { selectProperty } from 'ducks/data/selectors';
import { RootState } from 'ducks/store';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const EditButton: FC<{
  editing: boolean;
  onClick: IconButtonProps['onClick'];
}> = ({ editing, onClick }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'dialog' });
  return (
    <Tooltip
      disableInteractive
      title={
        <Typography fontSize="0.9rem">
          {editing ? t('close') : t('edit')}
        </Typography>
      }
    >
      <IconButton
        color="secondary"
        size="small"
        onClick={onClick}
        sx={{
          visibility: 'hidden',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          position: 'absolute',
          right: '-0.5rem',
          top: '-0.5rem',
          padding: '0.3rem',
          zIndex: '1',
        }}
      >
        {!editing && <EditIcon fontSize="small" sx={{ fontSize: '1.1rem' }} />}
        {editing && <CloseIcon fontSize="small" sx={{ fontSize: '1.1rem' }} />}
      </IconButton>
    </Tooltip>
  );
};

export const AbilityCard: FC<{ name: string }> = ({ name }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'abilities' });
  const { t: tDialog } = useTranslation('translation', { keyPrefix: 'dialog' });

  const character = useSelector(selectCharacter);

  const parentRef = useRef();

  const [localOverride, setLocalOverride] = useState<number>(0);
  const [localEnabled, setLocalEnabled] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | undefined | HTMLElement>(
    null,
  );

  const confirmChanges = () => {
    dispatch(
      setAbility({
        name,
        value: {
          ...character.abilities[name],
          enabled: localEnabled,
          override: localOverride,
        },
      }),
    );
  };

  const discardChanges = () => {
    setLocalOverride(character.abilities[name].override);
    setLocalEnabled(character.abilities[name].enabled);
  };

  const handleEditDone = () => {
    setEditing(!editing);

    if (editing) {
      confirmChanges();
    }
  };

  const handleEditCancel = () => {
    setEditing(!editing);

    if (editing) {
      discardChanges();
    }
  };

  const handleToggleAbility = () => {
    setLocalEnabled(!localEnabled);
  };

  const handleOverrideChanged = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('ekk');
    if (isNaN(event.target.valueAsNumber)) {
      event.target.valueAsNumber = 0;
    }

    event.target.valueAsNumber = Math.max(
      Math.min(event.target.valueAsNumber, ABILITY_BONUS.MAX),
      ABILITY_BONUS.MIN,
    );

    setLocalOverride(event.target.valueAsNumber);
  };

  useEffect(() => {
    setAnchorEl(parentRef.current);
  }, [parentRef]);

  const actualValue = localOverride | character.abilities[name].value;
  const actualAbility = useSelector((state: RootState) =>
    selectProperty(state, 'abilities', name),
  );

  return (
    <Box
      ref={parentRef}
      width="18rem"
      marginBottom="0.8rem"
      sx={{
        position: 'relative',
        '&:hover': {
          button: {
            visibility: 'visible',
          },
        },
      }}
    >
      <Popover
        open={editing}
        onClose={handleEditCancel}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: -8, horizontal: -8 }}
        TransitionComponent={Collapse}
        PaperProps={{
          sx: {
            overflow: 'visible',
            width: '19rem',
            '&': {
              button: {
                visibility: 'visible',
              },
            },
          },
        }}
      >
        <ParBox
          sx={{
            padding: '0.4rem',
            display: 'grid',
            gridTemplateRows: 'auto auto auto',
            rowGap: '0.5rem',
            alignContent: 'space-between',
          }}
        >
          <EditButton editing={true} onClick={handleEditCancel} />
          <AbilityBase
            shadow
            title={name}
            ability={actualAbility}
            value={actualValue}
            enabled={localEnabled}
          />
          <Button
            sx={{
              gridRow: '2',
              height: '1.5rem',
            }}
            variant="contained"
            onClick={handleToggleAbility}
          >
            {t(localEnabled ? 'disable' : 'activate')}
          </Button>
          <FormControlLabel
            componentsProps={{
              typography: { fontSize: '1.2rem' },
            }}
            sx={{
              gridRow: '3',
              fontSize: '1.2rem',
              margin: '0',
            }}
            label={t('override')}
            control={
              <TextField
                type="number"
                defaultValue={character.abilities[name].override || 0}
                size="small"
                color="primary"
                onChange={handleOverrideChanged}
                sx={{
                  borderColor: 'primary.main',
                  width: '3.4rem',
                  marginRight: '0.5rem',
                }}
                inputProps={{
                  min: ABILITY_BONUS.MIN,
                  max: ABILITY_BONUS.MAX,
                  sx: {
                    textAlign: 'center',
                    padding: '0.3rem',
                    '&': {
                      borderColor: '#808080',
                    },
                  },
                }}
              />
            }
          />
          <Button
            sx={{ gridRow: '4' }}
            variant="contained"
            onClick={handleEditDone}
          >
            {tDialog('done')}
          </Button>
        </ParBox>
      </Popover>
      <>
        <EditButton editing={false} onClick={handleEditDone} />
        <AbilityBase
          shadow
          title={name}
          ability={actualAbility}
          value={actualValue}
          enabled={character.abilities[name].enabled}
        />
      </>
    </Box>
  );
};
