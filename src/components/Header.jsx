import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import { Paper } from "@mui/material";

import { APP_ROUTES } from "../constants";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate(APP_ROUTES.LOGIN);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250, textAlign: "center" }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Box sx={{ width: "100%" }} role="presentation">
                <Paper
                  sx={{
                    padding: "6px 0",
                    margin: "8px",
                    backgroundColor: "#556cd6", // todo: use from theme or MUI
                    color: "white",
                  }}
                >
                  Кантора
                </Paper>
              </Box>

              <List>
                <Link to={APP_ROUTES.HOME}>
                  <ListItem key={"home"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Домашня сторінка"} />
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Link to={APP_ROUTES.USERS_TIME_LOGS}>
                  <ListItem key={"usersTimeLogs"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AddAlarmIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Фіксація часу"} />
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Link to={APP_ROUTES.ADMIN}>
                  <ListItem key={"admin"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Адмін"} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Box>
          </Drawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Кантора
          </Typography>
          <Button color="inherit" onClick={signOut}>
            Вихід
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
