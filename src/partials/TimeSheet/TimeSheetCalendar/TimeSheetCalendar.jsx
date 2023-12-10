import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Card } from "@mui/material";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FunctionsIcon from "@mui/icons-material/Functions";
import Divider from "@mui/material/Divider";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import EditIcon from "@mui/icons-material/Edit";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import { green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TimeSheetHoursItem from "../TimeSheetHoursItem/TimeSheetHoursItem";

const TimeSheetCalendar = () => {
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
          {/*  */}
          <Divider color="black" sx={{ width: "100%" }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DateRangeIcon />
            <Chip sx={{ width: "50px" }} label="30" color="default" />
            <Chip sx={{ width: "50px" }} label="31" color="default" />
            <Chip sx={{ width: "50px" }} label="1" color="primary" />
            <Chip sx={{ width: "50px" }} label="2" color="primary" />
            <Chip sx={{ width: "50px" }} label="3" color="primary" />
            <Chip sx={{ width: "50px" }} label="4" color="error" />
            <Chip sx={{ width: "50px" }} label="5" color="error" />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon />
            <Chip sx={{ width: "50px" }} label="-" color="default" />
            <Chip sx={{ width: "50px" }} label="-" color="default" />

            <TimeSheetHoursItem />
            <TimeSheetHoursItem />
            <TimeSheetHoursItem />
            <Chip sx={{ width: "50px" }} label="0" color="secondary" />
            <Chip sx={{ width: "50px" }} label="0" color="secondary" />
            <Chip sx={{ width: "50px" }} label="40" color="default" />
          </Stack>
          <Divider color="black" sx={{ width: "100%" }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DateRangeIcon />
            <Chip sx={{ width: "50px" }} label="6" color="primary" />
            <Chip sx={{ width: "50px" }} label="7" color="primary" />
            <Chip sx={{ width: "50px" }} label="8" color="primary" />
            <Chip sx={{ width: "50px" }} label="9" color="primary" />
            <Chip sx={{ width: "50px" }} label="10" color="primary" />
            <Chip sx={{ width: "50px" }} label="11" color="error" />
            <Chip sx={{ width: "50px" }} label="12" color="error" />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="0" color="error" />
            <Chip sx={{ width: "50px" }} label="0" color="error" />
            <Chip sx={{ width: "50px" }} label="40" color="default" />
          </Stack>
          <Divider color="black" sx={{ width: "100%" }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DateRangeIcon />
            <Chip sx={{ width: "50px" }} label="13" color="primary" />
            <Chip sx={{ width: "50px" }} label="14" color="primary" />
            <Chip sx={{ width: "50px" }} label="15" color="primary" />
            <Chip sx={{ width: "50px" }} label="16" color="primary" />
            <Chip sx={{ width: "50px" }} label="17" color="primary" />
            <Chip sx={{ width: "50px" }} label="18" color="error" />
            <Chip sx={{ width: "50px" }} label="19" color="error" />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="0" color="error" />
            <Chip sx={{ width: "50px" }} label="0" color="error" />
            <Chip sx={{ width: "50px" }} label="40" color="default" />
          </Stack>
          <Divider color="black" sx={{ width: "100%" }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DateRangeIcon />
            <Chip sx={{ width: "50px" }} label="20" color="primary" />
            <Chip sx={{ width: "50px" }} label="21" color="primary" />
            <Chip sx={{ width: "50px" }} label="22" color="primary" />
            <Chip sx={{ width: "50px" }} label="23" color="primary" />
            <Chip sx={{ width: "50px" }} label="24" color="primary" />
            <Chip sx={{ width: "50px" }} label="25" color="error" />
            <Chip sx={{ width: "50px" }} label="26" color="error" />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="0" color="error" />
            <Chip sx={{ width: "50px" }} label="0" color="error" />
            <Chip sx={{ width: "50px" }} label="40" color="default" />
          </Stack>
          <Divider color="black" sx={{ width: "100%" }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DateRangeIcon />
            <Chip sx={{ width: "50px" }} label="27" color="primary" />
            <Chip sx={{ width: "50px" }} label="28" color="primary" />
            <Chip sx={{ width: "50px" }} label="29" color="primary" />
            <Chip sx={{ width: "50px" }} label="30" color="primary" />
            <Chip sx={{ width: "50px" }} label="1" color="default" />
            <Chip sx={{ width: "50px" }} label="2" color="default" />
            <Chip sx={{ width: "50px" }} label="3" color="default" />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="8" color="success" />
            <Chip sx={{ width: "50px" }} label="-" color="default" />
            <Chip sx={{ width: "50px" }} label="-" color="default" />
            <Chip sx={{ width: "50px" }} label="-" color="default" />
            <Chip sx={{ width: "50px" }} label="40" color="default" />
          </Stack>
          <Divider color="black" sx={{ width: "100%" }} />
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
            {/*  */}
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

// TimeLogsForm.propTypes = {
//   setLogsList: PropTypes.func,
// };

export default TimeSheetCalendar;
