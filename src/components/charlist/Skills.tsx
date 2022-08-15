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
  styled,
} from '@mui/material';
import ParBox from 'components/styled/ParBox';
import { selectProperty } from 'ducks/data/selectors';
import { RootState } from 'ducks/store';
import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Ability } from './Charlist';

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

interface SkillBaseProps {
  title: string;
  ability: string;
  value: number;
  enabled: boolean;
  shadow?: boolean;
}

const SkillBaseCell = styled(ParBox)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SkillBase: FC<SkillBaseProps> = ({
  title,
  ability,
  value,
  enabled,
  shadow,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'skills' });

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
      <SkillBaseCell
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
      </SkillBaseCell>
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
      <SkillBaseCell shadow={shadow} sx={{ gridColumn: '3' }}>
        <Typography sx={{ fontSize: 'inherit' }}>{t(title)}</Typography>
      </SkillBaseCell>
    </Box>
  );
};

export const Skill: FC<{
  title: string;
  item: Ability;
  onChange: (item: Ability) => void;
}> = ({ title, item, onChange }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'skills' });
  const { t: tDialog } = useTranslation('translation', { keyPrefix: 'dialog' });

  const parentRef = useRef();

  const [localOverride, setLocalOverride] = useState<number>(0);
  const [localEnabled, setLocalEnabled] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | undefined | HTMLElement>(
    null,
  );

  const confirmChanges = () => {
    if (onChange) {
      onChange({ ...item, enabled: localEnabled, override: localOverride });
    }
  };

  const discardChanges = () => {
    setLocalOverride(item.override);
    setLocalEnabled(item.enabled);
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
    setLocalOverride(parseInt(event.target.value));
  };

  useEffect(() => {
    setAnchorEl(parentRef.current);
  }, [parentRef]);

  const actualValue = localOverride | item.value;
  const actualAbility = useSelector((state: RootState) =>
    selectProperty(state, 'abilities', title),
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
          <SkillBase
            shadow
            title={title}
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
                defaultValue={item.override || 0}
                size="small"
                color="primary"
                onChange={handleOverrideChanged}
                sx={{
                  borderColor: 'primary.main',
                  width: '2.8rem',
                  marginRight: '0.5rem',
                }}
                inputProps={{
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
        <SkillBase
          shadow
          title={title}
          ability={actualAbility}
          value={actualValue}
          enabled={item.enabled}
        />
      </>
    </Box>
  );
};

export const Skills: FC<{
  items: { [x: string]: Ability };
  setItems: any;
}> = ({ items, setItems, ...props }) => {
  const [renderedItems, setRenderedItems] = useState<ReactNode>();

  useEffect(() => {
    setRenderedItems(
      Object.keys(items).map((key) => (
        <Skill
          key={key}
          title={key}
          item={items[key]}
          onChange={(item: Ability) => {
            setItems({ ...items, [key]: item });
          }}
        />
      )),
    );
  }, [items, setItems]);

  return <Box {...props}>{renderedItems}</Box>;
};
