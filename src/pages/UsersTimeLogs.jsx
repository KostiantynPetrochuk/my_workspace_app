import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { APP_ROUTES } from "../constants";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import useFetchPrivate from "../hooks/useFetchPrivate";
import { setUsers, selectUsers } from "../features/users/usersSlice";

const UsersTimeLogs = () => {
  const fetchPrivate = useFetchPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const { auth } = useAuth();
  const [selectedUser, setSelectedUser] = useState(auth.userId);
  const usersFetched = useRef(false);

  const users = useSelector(selectUsers);

  const handleChangeSelectedUser = (event) => {
    setSelectedUser(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!usersFetched.current) {
          startLoading();
        }
        const response = await fetchPrivate("users");
        dispatch(setUsers(response));
        stopLoading();
      } catch (error) {
        if (!usersFetched.current) {
          stopLoading();
        }
        console.log(error);
        navigate(APP_ROUTES.LOGIN, {
          state: { from: location },
          replace: true,
        });
      }
    };

    if (usersFetched.current === false) {
      fetchUsers();
      usersFetched.current = true;
    }

    const intervalId = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, fetchPrivate, navigate, startLoading, stopLoading]);

  const handleClick = () => {
    const addUserTimeLog = async () => {
      try {
        const response = await fetchPrivate("usersTimeLogs", {
          method: "POST",
          body: JSON.stringify({ message: "hello" }),
        });
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    };
    addUserTimeLog();
  };

  const menuItems = users.map((user) => (
    <MenuItem key={user._id} value={user._id}>
      {`${user.firstName} ${user.lastName} ${user.surrName}`}
    </MenuItem>
  ));

  return (
    <Container component="main">
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            marginTop: 2,
            width: "100%",
          }}
          elevation={24}
        >
          <Typography variant="h5" component="h2">
            Фіксація часу
          </Typography>
        </Paper>

        <Card elevation={24} sx={{ marginTop: 2, padding: 2, width: "50%" }}>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <InputLabel id="demo-simple-select-label">Працівник</InputLabel>
            <Select
              sx={{ width: "65%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUser}
              label="Працівник"
              onChange={handleChangeSelectedUser}
            >
              {menuItems}
            </Select>

            <Button variant="contained" onClick={handleClick}>
              Розпочати
            </Button>
            {/* <Button variant="contained">Завершити</Button> */}
          </FormControl>
        </Card>
      </Box>
    </Container>
  );
};

export default UsersTimeLogs;
