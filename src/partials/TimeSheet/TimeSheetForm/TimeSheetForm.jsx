import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { selectUsers } from "../../../features/users/usersSlice";

const TimeSheetForm = ({
  selectedUserId,
  setSelectedUserId,
  year,
  setYear,
  month,
  setMonth,
}) => {
  const users = useSelector(selectUsers);

  const handleChangeSelectedUser = (event) => {
    setSelectedUserId(event.target.value);
  };

  const menuItems = users?.map((user) => (
    <MenuItem key={user._id} value={user._id}>
      {`${user.firstName} ${user.lastName} ${user.surrName}`}
    </MenuItem>
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
      <Card elevation={24} sx={{ marginTop: 2, padding: 2, width: "50%" }}>
        <FormControl
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <InputLabel id="demo-simple-select-label">Працівник</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedUserId}
            label="Працівник"
            onChange={handleChangeSelectedUser}
          >
            {menuItems}
          </Select>
        </FormControl>
      </Card>
      <Card
        elevation={24}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
          padding: 2,
          width: "50%",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            width: "48%",
          }}
        >
          <DatePicker
            label="Рік"
            views={["year"]}
            value={year}
            onChange={(newValue) => setYear(newValue)}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            width: "48%",
          }}
        >
          <DatePicker
            label="Місяць"
            views={["month"]}
            value={month}
            onChange={(newValue) => setMonth(newValue)}
          />
        </Box>
      </Card>
    </Box>
  );
};

TimeSheetForm.propTypes = {
  selectedUserId: PropTypes.string,
  setSelectedUserId: PropTypes.func,
  year: PropTypes.instanceOf(Date),
  setYear: PropTypes.func,
  month: PropTypes.instanceOf(Date),
  setMonth: PropTypes.func,
};

export default TimeSheetForm;
