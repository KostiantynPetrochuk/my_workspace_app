import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import useFetchPrivate from "../../../hooks/useFetchPrivate";
import { updateLogs } from "../../../features/selectedUserLogs/selectedUserLogsSlice";
import useMessage from "../../../hooks/useMessage";

const TimeSheetHoursEditModal = ({
  open,
  handleClose,
  logId,
  logStatus,
  date,
  dateString,
}) => {
  const fetchPrivate = useFetchPrivate();
  const dispatch = useDispatch();
  const showMessage = useMessage();
  const [time, setTime] = React.useState(new Date(date));

  const handleClickSubmit = async () => {
    const result = await fetchPrivate("timeLogs", {
      method: "PATCH",
      body: JSON.stringify({ logId, time, logStatus }),
    });
    dispatch(updateLogs(result));
    handleClose();
    showMessage({
      title: "Успіх!",
      text: "Час фіксації успішно оновлено!",
      severity: "success",
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Редагування входу"}</DialogTitle>
        <DialogContent sx={{ paddingTop: 10 }}>
          <DialogContentText
            sx={{ marginBottom: 2 }}
            id="alert-dialog-description"
          >
            {dateString}
          </DialogContentText>
          <TimePicker
            label="Час"
            value={time}
            onChange={(newValue) => setTime(newValue)}
          />
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

TimeSheetHoursEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  logId: PropTypes.string.isRequired,
  logStatus: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
};

export default TimeSheetHoursEditModal;
