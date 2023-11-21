import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

import UsersTimeLogsListItem from "../UsersTimeLogsListItem";

const UsersTimeLogsList = ({ logsList }) => {
  const logItemsList = logsList.map((log) => (
    <UsersTimeLogsListItem key={log.date} log={log} />
  ));

  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: "center",
        marginTop: 2,
        marginBottom: 2,
        width: "50%",
      }}
      elevation={24}
    >
      <List
        sx={{
          width: "100%",
          maxHeight: 540,
          overflow: "auto",
          bgcolor: "background.paper",
        }}
        component="div"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Історія фіксацій
          </ListSubheader>
        }
      >
        {logItemsList}
      </List>
    </Paper>
  );
};

UsersTimeLogsList.propTypes = {
  logsList: PropTypes.array,
};

export default UsersTimeLogsList;
