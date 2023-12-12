import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import TimeSheetHoursSubItem from "../TimeSheetHoursSubItem/TimeSheetHoursSubItem";

const TimeSheetHoursItem = ({ logsItem }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
      return <TimeSheetHoursSubItem key={index} logStatus={log.status} />;
    }
    if (log.status === "out") {
      return (
        <React.Fragment key={index}>
          <TimeSheetHoursSubItem logStatus={"in"} date={log.entries.in.date} />
          <TimeSheetHoursSubItem
            logStatus={"out"}
            date={log.entries.out.date}
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
            }}
            elevation={24}
          >
            {logsItemsList}
          </Paper>
        </Box>
      </Popover>
    </Box>
  );
};

TimeSheetHoursItem.propTypes = {
  logsItem: PropTypes.object,
};

export default TimeSheetHoursItem;
