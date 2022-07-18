import { Box, Button, ButtonProps, Slide, Typography } from '@mui/material';
import { Information } from 'components/common/Information';
import { LeftPane } from 'components/common/WelcomePage/LeftPane';
import { RightPane } from 'components/common/WelcomePage/RightPane';
import { WelcomePage } from 'components/common/WelcomePage/WelcomePage';
import { ROUTE } from 'consts';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });

  const navigate = useNavigate();

  const toProfile = () => navigate(ROUTE.ME);
  const toCharlist = () => navigate(ROUTE.CHARLIST);

  return (
    <WelcomePage>
      <LeftPane>
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
              <StyledButton onClick={toProfile}>{t('myProfile')}</StyledButton>
              <StyledButton onClick={toCharlist}>
                {t('lastCharlist')}
              </StyledButton>
            </Box>
          </Slide>
        </Box>
        <Box flexGrow="1" />
      </LeftPane>
      <RightPane>
        <Information />
      </RightPane>
    </WelcomePage>
  );
};

export default MainPage;
