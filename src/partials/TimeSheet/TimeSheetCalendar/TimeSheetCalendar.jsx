import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FunctionsIcon from "@mui/icons-material/Functions";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

import TimeSheetCalendarRow from "../TimeSheetCalendarRow/TimeSheetCalendarRow";

const TimeSheetCalendar = ({ logsList = [], year, month }) => {
  const daysInChunks = chunkArray(logsList, 7);
  const rows = daysInChunks.map((logs, index) => (
    <TimeSheetCalendarRow key={index} logs={logs} year={year} month={month} />
  ));

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Card elevation={24} sx={{ marginTop: 2, padding: 2 }}>
        <Stack spacing={1} alignItems="start">
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CalendarMonthIcon />
            <Chip sx={{ width: "50px" }} label="Пн" color="info" />
            <Chip sx={{ width: "50px" }} label="Вт" color="info" />
            <Chip sx={{ width: "50px" }} label="Ср" color="info" />
            <Chip sx={{ width: "50px" }} label="Чт" color="info" />
            <Chip sx={{ width: "50px" }} label="Пт" color="info" />
            <Chip sx={{ width: "50px" }} label="Сб" color="error" />
            <Chip sx={{ width: "50px" }} label="Нд" color="error" />
            <FunctionsIcon sx={{ width: "50px" }} />
          </Stack>
          <Divider color="black" sx={{ width: "100%" }} />
          {rows}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h7" component="h4">
              Всього за місяць:
            </Typography>
            <Chip
              sx={{
                width: "50px",
              }}
              label="180"
              color="default"
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

TimeSheetCalendar.propTypes = {
  logsList: PropTypes.array,
  year: PropTypes.number,
  month: PropTypes.number,
};

function chunkArray(array, chunkSize) {
  const resultArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    resultArray.push(array.slice(i, i + chunkSize));
  }
  return resultArray;
}

export default TimeSheetCalendar;
