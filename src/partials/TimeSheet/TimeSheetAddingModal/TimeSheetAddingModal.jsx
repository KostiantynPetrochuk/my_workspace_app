import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import Typography from "@mui/material/Typography";

const TimeSheetAddingModal = ({ open, handleClose, dateString }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Додати фіксацію</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ marginBottom: 2 }}
            id="alert-dialog-description"
          >
            {dateString}
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ marginBottom: 2, display: "flex" }}>
              <Typography
                sx={{ marginRight: 1 }}
                variant="subtitle1"
                component="span"
              >
                Вхід
              </Typography>
              <WorkIcon color="success" />
            </Box>

            <TimePicker
              label="Час"
              value={new Date()}
              onChange={(newValue) => console.log("new value", newValue)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відміна</Button>
          <Button onClick={handleClose} autoFocus>
            Підтвердити
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

TimeSheetAddingModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  dateString: PropTypes.string,
};

export default TimeSheetAddingModal;
