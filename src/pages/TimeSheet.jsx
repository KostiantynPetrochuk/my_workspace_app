import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { endOfMonth } from "date-fns";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { APP_ROUTES } from "../constants";
import useLoading from "../hooks/useLoading";
import useFetchPrivate from "../hooks/useFetchPrivate";
import { setUsers, selectUsers } from "../features/users/usersSlice";
import TimeSheetForm from "../partials/TimeSheet/TimeSheetForm/TimeSheetForm";
import TimeSheetCalendar from "../partials/TimeSheet/TimeSheetCalendar/TimeSheetCalendar";
import useAuth from "../hooks/useAuth";
import { getParsedLogs } from "../partials/TimeSheet/helpers";
import { setSelectedUserLogs } from "../features/selectedUserLogs/selectedUserLogsSlice";

const TimeSheet = () => {
  const fetchPrivate = useFetchPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const users = useSelector(selectUsers);
  const usersFetched = useRef(false);
  const { auth } = useAuth();

  const [selectedUserId, setSelectedUserId] = useState(
    auth.userId && users.length ? auth.userId : ""
  );

  const [year, setYear] = useState(new Date());
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!usersFetched.current) {
          startLoading();
        }
        const response = await fetchPrivate("users");
        dispatch(setUsers(response));
        setSelectedUserId(auth.userId);
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
  }, [
    auth.userId,
    dispatch,
    fetchPrivate,
    navigate,
    startLoading,
    stopLoading,
  ]);

  useEffect(() => {
    if (selectedUserId) {
      const fetchLogs = async () => {
        try {
          startLoading();

          const response = await fetchPrivate("timeLogs/getByUserId", {
            method: "POST",
            body: JSON.stringify({
              userId: selectedUserId,
              year: year.getFullYear(),
              month: month.getMonth(),
            }),
          });

          const currentMonth = month.getMonth();
          const currentYear = year.getFullYear();
          const currentDate = new Date(currentYear, currentMonth);
          const endDate = endOfMonth(currentDate);
          const lastDay = endDate.getDate();
          const { userLogs } = response;
          const parsedLogs = getParsedLogs(userLogs, lastDay, currentDate);
          dispatch(setSelectedUserLogs(parsedLogs));

          stopLoading();
        } catch (error) {
          stopLoading();
          console.log(error);
          navigate(APP_ROUTES.LOGIN, {
            state: { from: location },
            replace: true,
          });
        }
      };
      fetchLogs();
    }
  }, [selectedUserId, month, year]);

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
            Табель
          </Typography>
        </Paper>
      </Box>
      <TimeSheetForm
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <TimeSheetCalendar year={year.getFullYear()} month={month.getMonth()} />
    </Container>
  );
};

export default TimeSheet;
