import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const CancelButton = styled(Button)((/* { theme } */) => ({
  // color: theme.palette.getContrastText(green[500]),
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
  },
  color: "#fff",
}));

export default CancelButton;
