import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import useAuth from "../hooks/useAuth";
import useMessage from "../hooks/useMessage";
import useLoading from "../hooks/useLoading";
import { selectPersist, setPersist } from "../features/persist/persistSlice";
import { API_URL, APP_ROUTES } from "../constants";

const Login = () => {
  const { setAuth } = useAuth();
  const showMessage = useMessage();
  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();
  const persist = useSelector(selectPersist);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || APP_ROUTES.HOME;

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigateToRegister = () => navigate(APP_ROUTES.REGISTER);

  const handleInputEmail = () => setIsEmailValid(true);

  const handleInputPassword = () => setIsPasswordValid(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const pwd = data.get("password");

    if (!email.length) {
      setIsEmailValid(false);
    }

    if (!pwd.length) {
      setIsPasswordValid(false);
    }

    if (!email.length || !pwd.length) {
      showMessage({
        title: "Помилка!",
        text: "Вкажіть коректні дані: електронна пошта та пароль!",
        severity: "error",
      });
      return;
    }

    try {
      startLoading();
      const response = await fetch(`${API_URL}auth`, {
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
          email,
          pwd,
        }),
      });

      if (response.status === 401) {
        setIsEmailValid(false);
        setIsPasswordValid(false);
        showMessage({
          title: "Помилка!",
          text: "Не вірно вказано електронну пошту, або пароль.",
          severity: "error",
        });
        stopLoading();
        return;
      }

      const authData = await response.json();
      setAuth(authData);
      stopLoading();
      navigate(from, { replace: true });
    } catch (error) {
      stopLoading();
      console.log("error", error);
      showMessage({
        title: "Помилка!",
        text: "Сервер не відповідає. Будь ласка, спробуйте пізніше.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

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
          Вхід
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!isEmailValid}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Електронна пошта"
            name="email"
            autoComplete="email"
            autoFocus
            onInput={handleInputEmail}
          />
          <TextField
            error={!isPasswordValid}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onInput={handleInputPassword}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                checked={persist}
                onClick={() =>
                  persist
                    ? dispatch(setPersist(false))
                    : dispatch(setPersist(true))
                }
                color="primary"
              />
            }
            label="Запам'ятати мене"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Увійти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забули пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ cursor: "pointer" }}
                variant="body2"
                onClick={navigateToRegister}
              >
                {"Не маєте аккаунту? Реєстрація"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
