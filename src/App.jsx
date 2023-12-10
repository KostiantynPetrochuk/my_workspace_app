import ukLocale from "date-fns/locale/uk";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Missing from "./pages/Missing";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { ROLES, APP_ROUTES } from "./constants";
import TimeLogs from "./pages/TimeLogs";
import TimeSheet from "./pages/TimeSheet";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./App.css";

const App = () => (
  <LocalizationProvider
    dateAdapter={AdapterDateFns}
    locale={ukLocale}
    adapterLocale={ukLocale}
  >
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Layout />}>
        {/* publick routes */}
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.REGISTER} element={<Register />} />
        <Route path={APP_ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path={APP_ROUTES.HOME} element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path={APP_ROUTES.ADMIN} element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path={APP_ROUTES.TIME_LOGS} element={<TimeLogs />} />
            <Route path={APP_ROUTES.TIME_SHEET} element={<TimeSheet />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  </LocalizationProvider>
);

export default App;
