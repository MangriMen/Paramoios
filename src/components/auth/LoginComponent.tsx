import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { authSlice } from "ducks/auth";

function LoginComponent({ changeComponentType }: any) {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });

  const theme = useTheme();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handlerSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(
      authSlice.actions.login({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const tempInputStyle = {
    "& .MuiOutlinedInput-root": {
      fontSize: "1.4rem",
      input: {
        "&:-webkit-autofill": {
          WebkitTextFillColor: theme.palette.secondary.main,
          WebkitBoxShadow:
            "0 0 0 1000px " + theme.palette.primary.dark + " inset",
        },
      },
      color: theme.palette.secondary.main,
      "& fieldset": {
        borderColor: theme.palette.secondary.main,
        borderWidth: "2px",
      },
      "&:hover fieldset": { borderColor: theme.palette.secondary.main },
    },
  };

  const tempInputLabelStyle = {
    sx: {
      fontSize: "1.4rem",
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component={"h2"}
          variant={"h2"}
          fontWeight="bold"
          sx={{ fontSize: { xs: "3rem" } }}
        >
          {t("authorize")}
        </Typography>
        <Link
          color="secondary"
          component="button"
          underline="none"
          variant="button"
          sx={{
            fontSize: "1.4rem",
            textShadow: "1px 1px 5px black",
            fontWeight: "bold",
            "&:hover": {
              color: theme.palette.secondary.light,
            },
          }}
          onClick={changeComponentType}
        >
          {t("orRegister")}
        </Link>
        <Box
          component={"form"}
          onSubmit={handlerSubmit}
          sx={{ maxWidth: "21rem", mt: 1 }}
        >
          <TextField
            margin={"normal"}
            required
            fullWidth
            id={"email"}
            label={t("emailPlaceholder")}
            InputLabelProps={tempInputLabelStyle}
            name={"email"}
            autoComplete={"email"}
            autoFocus
            value={formData.email}
            onChange={handlerChange}
            variant={"outlined"}
            color="secondary"
            sx={tempInputStyle}
          />
          <TextField
            margin={"normal"}
            required
            fullWidth
            id={"password"}
            label={t("passwordPlaceholder")}
            InputLabelProps={tempInputLabelStyle}
            name={"password"}
            type={"password"}
            autoComplete={"current-password"}
            value={formData.password}
            onChange={handlerChange}
            color="secondary"
            sx={tempInputStyle}
          />
          <Button
            color="secondary"
            type={"submit"}
            fullWidth
            variant={"contained"}
            sx={{ mt: 3, mb: 2, fontSize: "1.1rem" }}
          >
            {t("logIn")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginComponent;
