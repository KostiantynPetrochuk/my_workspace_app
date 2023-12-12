import { format } from "date-fns";
import PropTypes from "prop-types";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import EditIcon from "@mui/icons-material/Edit";

const TimeSheetHoursSubItem = ({ logStatus, date }) => (
  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon color="error" />
      </IconButton>
    }
    sx={{ minWidth: "300px" }}
  >
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
    <IconButton>
      <EditIcon color="info" />
    </IconButton>
  </ListItem>
);

TimeSheetHoursSubItem.propTypes = {
  logStatus: PropTypes.string,
  date: PropTypes.string,
};

export default TimeSheetHoursSubItem;
