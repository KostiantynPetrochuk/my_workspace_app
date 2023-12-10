import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import React, { useState, useRef, useEffect } from "react";

import { format } from "date-fns";

import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";

import Popper from "@mui/material/Popper";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const TimeSheetHoursItem = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const log = {
    status: "in",
  };
  return (
    <Box>
      <Chip
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        sx={{
          width: "50px",
        }}
        label={open ? <HighlightOffIcon sx={{ marginTop: "4px" }} /> : "8"}
        color={open ? "warning" : "success"}
      />

      <Popper id={id} open={open} anchorEl={anchorEl}>
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
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              }
              key={"1"}
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
                    {log.status === "in" ? (
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
                    <Box>Вхід&nbsp;&nbsp;</Box>
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
                    <Box>{format(new Date(), "HH:mm:ss")}</Box>
                  </Box>
                }
              />
              <IconButton>
                <EditIcon color="info" />
              </IconButton>
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              }
              key={"2"}
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
                    {log.status !== "in" ? (
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

                    <Box>Вихід</Box>
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
                    <Box>{format(new Date(), "HH:mm:ss")}</Box>
                  </Box>
                }
              />
              <IconButton>
                <EditIcon color="info" />
              </IconButton>
            </ListItem>
          </Paper>
        </Box>
      </Popper>
    </Box>
  );
};

// TimeLogsForm.propTypes = {
//   setLogsList: PropTypes.func,
// };

export default TimeSheetHoursItem;
