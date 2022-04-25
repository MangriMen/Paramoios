import { Box, Container, Typography, useTheme } from "@mui/material";
import "assets/styles/deprecated/login.css";
import donationAlertLogo from "assets/images/deprecated/DA_Alert_White.svg";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getIsLogged } from "ducks/auth/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthPageComponent() {
  const theme = useTheme();
  const { t } = useTranslation("translation", { keyPrefix: "auth" });

  const isLogged = useSelector(getIsLogged);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/user");
    }
  }, [isLogged, navigate]);

  const [isLogin, setLogin] = useState(true);

  const changeComponentType = () => setLogin(!isLogin);

  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: theme.palette.primary.main }}
    >
      <Container
        maxWidth="xl"
        sx={{
          padding: {
            xs: "0",
            md: "0 24px",
          },
          display: {
            xs: "block",
            md: "flex",
          },
          position: "relative",
        }}
      >
        <Box
          id="auth-menu"
          sx={{
            position: {
              xs: "fixed",
              md: "sticky",
            },
            borderLeft: "10px solid",
            borderRight: "10px solid",
            boxShadow: "0 0 60px 2px #212121",
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.secondary.main,
            top: "0px",
            height: {
              xs: "100%",
              md: "100vh",
            },
            padding: "0 2rem",
            flexBasis: "50%",
            boxSizing: "border-box",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Typography
            textAlign="center"
            component="h1"
            sx={{
              fontSize: {
                xs: "3.5rem",
                sm: "5rem",
                md: "3.8rem",
                lg: "5rem",
                xl: "6rem",
              },
            }}
          >
            {t("welcome")}
          </Typography>
          {isLogin ? (
            <LoginComponent changeComponentType={changeComponentType} />
          ) : (
            <RegisterComponent changeComponentType={changeComponentType} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexBasis: "50%",
            paddingLeft: {
              xs: "0",
              md: "80px",
            },
            paddingRight: {
              xs: "0",
              md: "40px",
              lg: "20px",
            },
          }}
        >
          <Box>
            <AuthPageGreetings />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function AuthPageGreetings() {
  return (
    <section id="message" style={{ fontSize: "1.25rem" }}>
      <span className="main-text">
        <p className="hello text-black-shadow">Hello there!</p>
        <p className="hello russian text-black-shadow"> Привет!</p>
        <p className="text-black-shadow">
          We are the DnD5CharlistI team - a bunch of people with a dream of
          making truly comfortable and unique character list for
          worldwide-famous game "Dungeons and Dragons", and possibly bring it
          closer to the web.
        </p>

        <p className="russian text-black-shadow">
          Мы - команда DnD5CharlistI - группа людей, мечтающих сделать
          действительно удобный и уникальный лист персонажа для всемирно
          известной игры "Dungeons and Dragons", и, возможно, сделать шаг к
          упрощению её онлайн-компаний.
        </p>
        <br />
        <p className="text-black-shadow">
          Our version of charlist is in develop right now, being re-worked and
          polished. And that's what we alerady did:
        </p>
        <p className="russian text-black-shadow">
          Наша версия листа персонажа сейчас разрабатывается и всячески
          полируется. И вот что мы уже успели сделать:
        </p>

        <ol className="things-list text-black-shadow">
          <li>
            All main characteristics of a character were reorganised and got a
            fresh look
            <div className="russian russian-right">
              Все основные характеристики персонажа получили новое расположение
              и свежий образ
            </div>
          </li>
          <li>
            Visually-new inventory table was made
            <div className="russian russian-right">
              Основан фундамент для визуально новой таблицы инвентаря
            </div>
          </li>
          <li>
            Created an opportunity of account integration
            <div className="russian russian-right">
              Создана возможность интеграции информации аккаунта в лист
              персонажа
            </div>
          </li>
          <li>
            New and handy "roll-a-dice" button. Now you can blame imperfect
            digital RNG.
            <div className="russian russian-right">
              Удобная кнопка прокидывания кубиков. Теперь вините цифровой
              псевдорандом.
            </div>
          </li>
          <li>
            Added support of different color themes
            <div className="russian russian-right">
              Создана возможность поддержки различных цветовых схем
            </div>
          </li>
          <br />
          <span>
            And so on...
            <div className="russian russian-right">И так далее...</div>
          </span>
        </ol>
        <br />
        <br />
        <p className="text-black-shadow">
          Consider supporting us now to get{" "}
          <span className="absolutely-nothing">absolutely nothing</span>. Yea,
          you read it right. You can donate and prey its not a scam, or trust us
          and get something when it'll be finished. Just make sure we'll be able
          to identify you later.
        </p>
        <p className="text-black-shadow russian">
          Поддержав нас сейчас, вы можете получить ваше личное{" "}
          <span className="absolutely-nothing"> абсолютное ничего</span>. Да, вы
          всё правильно поняли. Вы можете задонатить и надеяться что это не
          мошенничество, а можете поверить нам и получить что-то когда мы
          закончим. Просто удостоверьтесь, что мы сможем идентифицировать вас
          позже.
        </p>
        <div className="donations text-black-shadow">
          <a
            rel="noreferrer"
            href="https://www.donationalerts.com/r/mangrimen"
            target="_blank"
          >
            <img
              className="logo"
              alt="Donation Alerts"
              src={donationAlertLogo}
            />
          </a>
        </div>
      </span>
    </section>
  );
}

export default AuthPageComponent;
