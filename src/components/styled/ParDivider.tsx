import { Divider, styled } from '@mui/material';

const ParDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  borderWidth: '2px',
  borderRadius: '2px',
}));

export default ParDivider;
