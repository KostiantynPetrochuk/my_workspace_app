import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { getDay, getMonth } from "date-fns";

import TimeSheetHoursSubItem from "../TimeSheetHoursSubItem/TimeSheetHoursSubItem";
import TimeSheetAddingModal from "../TimeSheetAddingModal";
import { DAYS, MONTHS } from "../../../constants";

const TimeSheetHoursItem = ({ logsItem, year, month }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddingLogModal, setOpenAddingLogModal] = useState(false);

  const date = new Date(year, month, logsItem?.day);
  const monthIndex = getMonth(date);
  const dayOfWeek = getDay(date);
  const dayOfWeekString = DAYS[dayOfWeek];
  const monthString = MONTHS[monthIndex];
  const dateString = `${dayOfWeekString.UA}, ${logsItem?.day} ${monthString.UA} ${year}`;

  const handleOpenAddingLogModal = () => {
    setOpenAddingLogModal(true);
  };

  const handleCloseAddingLogModal = () => {
    setOpenAddingLogModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const hoursResult = logsItem?.logs?.reduce(
    (acc, log) => (log.hours ? acc + log.hours : acc),
    0
  );

  const totalHours = hoursResult ? hoursResult : 0;

  let color = "default";

  if (totalHours > 0) {
    color = "success";
  } else if (totalHours === 0 && logsItem?.logs) {
    color = "secondary";
  }

  const logsItemsList = logsItem?.logs?.map((log, index) => {
    if (log.status === "in") {
      return (
        <TimeSheetHoursSubItem
          key={index}
          logId={log._id}
          logStatus={"in"}
          date={log.date}
          dateString={dateString}
        />
      );
    }
    if (log.status === "out") {
      return (
        <React.Fragment key={index}>
          <TimeSheetHoursSubItem
            logId={log._id}
            logStatus={"in"}
            date={log.entries.in.date}
            dateString={dateString}
          />
          <TimeSheetHoursSubItem
            logId={log._id}
            logStatus={"out"}
            date={log.entries.out.date}
            dateString={dateString}
          />
        </React.Fragment>
      );
    }
  });

  return (
    <Box>
      <Chip
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        sx={{
          width: "50px",
        }}
        label={totalHours}
        color={color}
      />
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Paper
            sx={{
              padding: 2,
              textAlign: "center",
              minWidth: "332px",
            }}
            elevation={24}
          >
            <Typography variant="subtitle1" component="span">
              {dateString}
            </Typography>
            {logsItemsList?.length > 0 ? (
              logsItemsList
            ) : (
              <Box sx={{ margin: 2 }}>Немає записів</Box>
            )}
            <Box>
              <Fab
                onClick={handleOpenAddingLogModal}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
              <TimeSheetAddingModal
                open={openAddingLogModal}
                handleClose={handleCloseAddingLogModal}
                dateString={dateString}
              />
            </Box>
          </Paper>
        </Box>
      </Popover>
    </Box>
  );
};

TimeSheetHoursItem.propTypes = {
  logsItem: PropTypes.object,
  year: PropTypes.number,
  month: PropTypes.number,
};

export default TimeSheetHoursItem;
