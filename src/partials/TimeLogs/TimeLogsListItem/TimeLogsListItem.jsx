import { format } from "date-fns";
import PropTypes from "prop-types";
import { ListItem, Box } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimeLogsListItem = ({ log }) => {
  const logLabel = log.status === "in" ? "Вхід" : "Вихід";
  return (
    <ListItem key={log.date}>
      <ListItemIcon>
        {log.status === "in" ? (
          <WorkIcon color="success" />
        ) : (
          <WorkOffIcon color="warning" />
        )}
      </ListItemIcon>
      <ListItemText sx={{ width: "50%" }} primary={logLabel} />
      <ListItemText
        sx={{ width: "50%" }}
        primary={
          <Box
            element="div"
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <AccessTimeIcon
              sx={{
                marginRight: "10px",
              }}
            />
            <Box>{format(new Date(log.date), "HH:mm:ss")}</Box>
          </Box>
        }
      />
    </ListItem>
  );
};

TimeLogsListItem.propTypes = {
  log: PropTypes.object,
};

export default TimeLogsListItem;
