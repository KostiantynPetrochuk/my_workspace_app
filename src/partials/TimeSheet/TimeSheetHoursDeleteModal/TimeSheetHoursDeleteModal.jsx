import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";

import useFetchPrivate from "../../../hooks/useFetchPrivate";
import useMessage from "../../../hooks/useMessage";
import {
  updateLogs,
  deleteLog,
} from "../../../features/selectedUserLogs/selectedUserLogsSlice";

const TimeSheetHoursDeleteModal = ({
  open,
  handleClose,
  dateString,
  logId,
  logStatus,
  date,
}) => {
  const fetchPrivate = useFetchPrivate();
  const dispatch = useDispatch();
  const showMessage = useMessage();

  const handleClickSubmit = async () => {
    const result = await fetchPrivate(`timeLogs`, {
      method: "DELETE",
      body: JSON.stringify({
        logId,
        logStatus,
      }),
    });

    if (result.newLog) {
      dispatch(updateLogs(result.newLog));
      showMessage({
        title: "Успіх!",
        text: "Фіксацію успішно видалено!",
        severity: "success",
      });
      handleClose();
      return;
    }

    dispatch(deleteLog({ _id: logId, date }));
    showMessage({
      title: "Успіх!",
      text: "Фіксацію успішно видалено!",
      severity: "success",
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Видалення фіксації"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 10 }}>
          <DialogContentText
            sx={{ marginBottom: 2 }}
            id="alert-dialog-description"
          >
            {dateString}
          </DialogContentText>
          <ListItem sx={{ minWidth: "300px" }}>
            <ListItemText
              primary={
                <Box
                  element="div"
                  sx={{
                    display: "flex",
                  }}
                >
                  {logStatus === "in" ? (
                    <WorkIcon
                      sx={{
                        marginRight: "10px",
                      }}
                      color="success"
                    />
                  ) : (
                    <WorkOffIcon
                      sx={{
                        marginRight: "10px",
                      }}
                      color="warning"
                    />
                  )}
                  {logStatus === "in" && <Box>Вхід&nbsp;&nbsp;</Box>}
                  {logStatus === "out" && <Box>Вихід</Box>}
                </Box>
              }
            />
            <ListItemText
              primary={
                <Box
                  element="div"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <AccessTimeIcon
                    sx={{
                      marginRight: "10px",
                    }}
                  />
                  <Box>{format(new Date(date), "HH:mm:ss")}</Box>
                </Box>
              }
            />
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickSubmit}>Підтвердити</Button>
          <Button onClick={handleClose} autoFocus>
            Скасувати
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

TimeSheetHoursDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dateString: PropTypes.string,
  logId: PropTypes.string,
  logStatus: PropTypes.string,
  date: PropTypes.string,
};

export default TimeSheetHoursDeleteModal;
