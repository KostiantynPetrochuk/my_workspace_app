import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const ConfirmButton = styled(Button)((/* { theme } */) => ({
  // color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  "&:hover": {
    backgroundColor: green[700],
  },
  color: "#fff",
}));

export default ConfirmButton;
