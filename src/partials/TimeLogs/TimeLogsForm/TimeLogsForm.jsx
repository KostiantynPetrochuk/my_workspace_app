import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import { green, orange } from "@mui/material/colors";
import Popover from "@mui/material/Popover";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

import useLoading from "../../../hooks/useLoading";
import useFetchPrivate from "../../../hooks/useFetchPrivate";
import useMessage from "../../../hooks/useMessage";
import { updateUserLog } from "../../../features/users/usersSlice";
import { selectUsers } from "../../../features/users/usersSlice";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../constants";
import ConfirmButton from "../ConfirmButton";
import CancelButton from "../CancelButton";
import { getButttonState, getLogsList } from "../Helpers";

const TimeLogsForm = ({ setLogsList }) => {
  const dispatch = useDispatch();
  const showMessage = useMessage();
  const fetchPrivate = useFetchPrivate();
  const { startLoading, stopLoading } = useLoading();
  const { auth } = useAuth();
  const [isInButton, setIsInButton] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(auth.userId);
  const [anchorEl, setAnchorEl] = useState(null);
  const users = useSelector(selectUsers);
  const isAdmin = auth.roles.includes(ROLES.Admin);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleShowPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleChangeSelectedUser = (event) => {
    setSelectedUserId(event.target.value);
    const selectedUser = users.find((user) => user._id === event.target.value);
    if (selectedUser?.lastTimeLog) {
      const buttonState = getButttonState(selectedUser?.lastTimeLog?.status);
      setIsInButton(buttonState);
    } else {
      setIsInButton(false);
    }
  };

  const menuItems = users?.map((user) => (
    <MenuItem key={user._id} value={user._id}>
      {`${user.firstName} ${user.lastName} ${user.surrName}`}
    </MenuItem>
  ));

  const handleClick = () => {
    const addUserTimeLog = async () => {
      handleClosePopover();
      startLoading();
      try {
        const response = await fetchPrivate("timeLogs", {
          method: "POST",
          body: JSON.stringify({ userId: selectedUserId }),
        });

        dispatch(
          updateUserLog({
            userId: selectedUserId,
            data: response.data,
          })
        );
        stopLoading();

        const buttonState = getButttonState(response.data.status);
        setIsInButton(buttonState);
        const workingStatus = buttonState ? "Початок" : "Завершення";
        showMessage({
          title: "Успіх!",
          text: `${workingStatus} роботи успішно зафіксовано.`,
          severity: "success",
        });
      } catch (error) {
        console.log(error);
      }
    };
    addUserTimeLog();
  };

  useEffect(() => {
    const selectedUser = users.find((user) => user._id === selectedUserId);
    const preparedLogsList = getLogsList(selectedUser);
    setLogsList(preparedLogsList);

    if (selectedUser?.lastTimeLog) {
      const buttonState = selectedUser?.lastTimeLog?.status === "in" ?? false;
      setIsInButton(buttonState);
    } else {
      setIsInButton(false);
    }
  }, [selectedUserId, setLogsList, users]);

  return (
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
          disabled={!isAdmin}
          sx={{ width: "65%" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={users?.length ? selectedUserId : ""}
          label="Працівник"
          onChange={handleChangeSelectedUser}
        >
          {menuItems}
        </Select>

        <Button
          aria-describedby={id}
          variant="contained"
          endIcon={isInButton ? <WorkOffIcon /> : <WorkIcon />}
          sx={{
            backgroundColor: isInButton ? orange[500] : green[500],
            "&:hover": {
              backgroundColor: isInButton ? orange[700] : green[700],
            },
          }}
          onClick={handleShowPopover}
        >
          {isInButton ? "Завершити" : "Розпочати"}
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Ви дійсно хочете провести фіксацію входу?
          </Typography>

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
              marginBottom: "16px",
            }}
          >
            <ConfirmButton
              sx={{
                width: "40%",
              }}
              startIcon={<CheckIcon />}
              onClick={handleClick}
            >
              Так
            </ConfirmButton>
            <CancelButton
              sx={{
                width: "40%",
              }}
              startIcon={<BlockIcon />}
              onClick={handleClosePopover}
            >
              Відміна
            </CancelButton>
          </Box>
        </Popover>
      </FormControl>
    </Card>
  );
};

TimeLogsForm.propTypes = {
  setLogsList: PropTypes.func,
};

export default TimeLogsForm;
