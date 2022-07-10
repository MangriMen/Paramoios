import {
  Box,
  Button,
  ButtonProps,
  Container,
  Slide,
  Typography,
  useTheme,
} from '@mui/material';
import { Information } from 'components/common/Information';
import { ROUTE } from 'consts';
import { selectError } from 'ducks/auth/selectors';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const StyledButton: FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      fullWidth
      color="secondary"
      variant="contained"
      sx={{
        mt: '1rem',
        minHeight: '80px',
        fontSize: 'clamp(1.5rem, 1.1000rem + 2.0000vw, 2rem)',
      }}
      {...props}
    />
  );
};

const MainPage: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });

  const navigate = useNavigate();

  const toProfile = () => navigate(ROUTE.ME);
  const toCharlist = () => navigate(ROUTE.CHARLIST);

  const error = useSelector(selectError);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          padding: {
            xs: '0',
            md: '0 24px',
          },
          display: {
            xs: 'block',
            md: 'flex',
          },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            position: {
              xs: 'static',
              md: 'sticky',
            },
            borderTopWidth: '0',
            borderBottomWidth: {
              xs: '6px',
              md: '0',
            },
            borderLeftWidth: {
              xs: '0',
              md: '10px',
            },
            borderRightWidth: {
              xs: '0',
              md: '10px',
            },
            borderStyle: 'solid',
            borderColor: theme.palette.secondary.main,
            boxShadow: '0 0 60px 2px #212121',
            backgroundColor: theme.palette.primary.main,
            top: '0px',
            height: {
              xs: '100%',
              md: '100vh',
            },
            padding: '2rem',
            flexBasis: '50%',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Typography
            textAlign="center"
            component="h1"
            sx={{
              fontSize: {
                xs: '3.5rem',
                sm: '5rem',
                md: '3.8rem',
                lg: '5rem',
                xl: '6rem',
              },
              lineHeight: 1,
            }}
          >
            {t('welcome')}
          </Typography>
          <Box
            flexGrow="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="21rem"
          >
            <Slide
              direction="up"
              in={true}
              mountOnEnter
              timeout={1250}
              easing="cubic-bezier(0.215, 0.61, 0.355, 1)"
            >
              <Box>
                <StyledButton onClick={toProfile}>
                  {t('myProfile')}
                </StyledButton>
                <StyledButton onClick={toCharlist}>
                  {t('lastCharlist')}
                </StyledButton>
              </Box>
            </Slide>
          </Box>
          <Box flexGrow="1" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexBasis: '50%',
            paddingLeft: {
              xs: '0',
              md: '80px',
            },
            paddingRight: {
              xs: '0',
              md: '40px',
              lg: '20px',
            },
          }}
        >
          <Box>
            <Information />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
