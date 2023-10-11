import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import useAuth from "../hooks/useAuth";

const FixingTime = () => {
  const { auth } = useAuth();
  const [selectedUser, setSelectedUser] = useState(auth.userId);

  const handleChangeSelectedUser = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <Container component="main">
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            marginTop: 2,
            width: "100%",
          }}
          elevation={24}
        >
          <Typography variant="h5" component="h2">
            Фіксація часу
          </Typography>
        </Paper>

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
              sx={{ width: "65%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUser}
              label="Працівник"
              onChange={handleChangeSelectedUser}
            >
              <MenuItem value={auth.userId}>
                {`${auth.firstName} ${auth.lastName} ${auth.surrName}`}
              </MenuItem>
              {/* <MenuItem value={10}>Петрочук Костянтин Станіславович</MenuItem>
              <MenuItem value={20}>Михайловський Дмитро Семенович</MenuItem>
              <MenuItem value={30}>Пенталюк Степан Генадійович</MenuItem> */}
            </Select>

            <Button variant="contained">Розпочати</Button>
            {/* <Button variant="contained">Завершити</Button> */}
          </FormControl>
        </Card>
      </Box>
    </Container>
  );
};

export default FixingTime;
