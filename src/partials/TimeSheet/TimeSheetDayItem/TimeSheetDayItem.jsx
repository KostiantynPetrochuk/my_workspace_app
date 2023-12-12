import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import getDay from "date-fns/getDay";

const TimeSheetDayItem = ({ index, logItem, year, month }) => {
  let color = "primary";
  const date = new Date(year, month, logItem.day);
  const dayOfWeek = getDay(date);
  if (!logItem.logs) {
    color = "default";
  } else if (dayOfWeek === 6 || (dayOfWeek === 0 && logItem.logs)) {
    color = "error";
  }
  return (
    <Chip
      key={index}
      sx={{ width: "50px" }}
      label={logItem.day}
      color={color}
    />
  );
};

TimeSheetDayItem.propTypes = {
  logItem: PropTypes.object,
  year: PropTypes.number,
  month: PropTypes.number,
  index: PropTypes.number,
};

export default TimeSheetDayItem;
