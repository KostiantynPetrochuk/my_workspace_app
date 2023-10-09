import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";
import { API_URL, APP_ROUTES } from "../constants";

const Register = () => {
  const navigate = useNavigate();
  const showMessage = useMessage();
  const { setAuth } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigateToLogin = () => navigate(APP_ROUTES.LOGIN);

  const handleSubmit = async (event) => {
    event.preventDefault();
    startLoading();
    const data = new FormData(event.currentTarget);

    const response = await fetch(`${API_URL}register`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        pwd: data.get("password"),
      }),
    });

    if (response.status === 201) {
      stopLoading();
      const authData = await response.json();
      setAuth(authData);

      showMessage({
        title: "Успіх!",
        text: "Ви успішно зареєстровані в системі!",
        severity: "success",
      });

      navigate("/", { replace: true });
    }
    if (response.status === 409) {
      stopLoading();
      setIsEmailValid(false);

      showMessage({
        title: "Помилка!",
        text: "Такий користувач вже існує!",
        severity: "error",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Реєстрація
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ім'я"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Прізвище"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!isEmailValid}
                required
                fullWidth
                id="email"
                label="Електронна пошта"
                name="email"
                autoComplete="email"
                onInput={() => setIsEmailValid(true)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зареєсруватись
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                sx={{ cursor: "pointer" }}
                variant="body2"
                onClick={navigateToLogin}
              >
                Вже маєте аккаунт? Увійти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
