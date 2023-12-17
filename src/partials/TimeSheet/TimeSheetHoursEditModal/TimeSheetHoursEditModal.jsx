import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const TimeSheetHoursEditModal = ({ open, handleClose }) => {
  const [time, setTime] = React.useState(new Date());

  const handleClickSubmit = () => {
    // console.log("ok");
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
            Понеділок, 25 грудня 2023
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
};

export default TimeSheetHoursEditModal;
