import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Divider from "@mui/material/Divider";

import TimeSheetHoursItem from "../TimeSheetHoursItem/TimeSheetHoursItem";
import TimeSheetDayItem from "../TimeSheetDayItem/TimeSheetDayItem";

const TimeSheetCalendarRow = ({ logs, year, month }) => {
  const daysList = logs.map((logItem, index) => (
    <TimeSheetDayItem key={index} logItem={logItem} year={year} month={month} />
  ));

  const hoursList = logs.map((logItem, index) => (
    <TimeSheetHoursItem
      key={index}
      logsItem={logItem}
      year={year}
      month={month}
    />
  ));

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <DateRangeIcon />
        {daysList}
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <AccessTimeIcon />
        {hoursList}
        <Chip sx={{ width: "50px" }} label="40" color="default" />
      </Stack>
      <Divider color="black" sx={{ width: "100%" }} />
    </>
  );
};

TimeSheetCalendarRow.propTypes = {
  logs: PropTypes.array,
  year: PropTypes.number,
  month: PropTypes.number,
};

export default TimeSheetCalendarRow;
