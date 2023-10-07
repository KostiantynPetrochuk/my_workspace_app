import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { selectMessage, hideMessage } from "../features/message/messageSlice";

const Message = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideMessage());
  };

  return (
    <Snackbar
      open={message.open}
      autoHideDuration={message.autoHideDuration}
      anchorOrigin={{
        vertical: message.vertical,
        horizontal: message.horizontal,
      }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={message.severity}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{message.title}</AlertTitle>
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Message;
