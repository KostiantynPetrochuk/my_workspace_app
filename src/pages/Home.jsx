import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import useLogout from "../hooks/useLogout";
import { APP_ROUTES } from "../constants";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate(APP_ROUTES.LOGIN);
  };

  return (
    <Container component="main">
      <Box>
        <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
          <Paper
            sx={{
              padding: 2,
              textAlign: "center",
              marginTop: 2,
            }}
            elevation={24}
          >
            <Typography variant="h5" component="h2">
              Домашня сторінка
            </Typography>
          </Paper>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Link to={APP_ROUTES.ADMIN}>Адмін сторінка</Link>
            <Button
              variant="contained"
              sx={{ marginTop: "12px", width: 100 }}
              onClick={signOut}
              endIcon={<LogoutIcon />}
            >
              Вихід
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
