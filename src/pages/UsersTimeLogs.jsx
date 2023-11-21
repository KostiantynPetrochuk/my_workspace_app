import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { APP_ROUTES } from "../constants";
import useLoading from "../hooks/useLoading";
import useFetchPrivate from "../hooks/useFetchPrivate";
import { setUsers } from "../features/users/usersSlice";
import { UsersTimeLogsList } from "../partials/UsersTimeLogs";
import UsersTimeLogsForm from "../partials/UsersTimeLogs/UsersTimeLogsForm/UsersTimeLogsForm";

const UsersTimeLogs = () => {
  const fetchPrivate = useFetchPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [logsList, setLogsList] = useState([]);
  const usersFetched = useRef(false);
  const todayDateString = format(new Date(), "dd.MM.yyyy");

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
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, fetchPrivate, navigate, startLoading, stopLoading]);

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

        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            marginTop: 2,
            width: "20%",
          }}
          elevation={24}
        >
          <Typography variant="h5" component="h2">
            {todayDateString}
          </Typography>
        </Paper>

        <UsersTimeLogsForm setLogsList={setLogsList} />
        <UsersTimeLogsList logsList={logsList} />
      </Box>
    </Container>
  );
};

export default UsersTimeLogs;
