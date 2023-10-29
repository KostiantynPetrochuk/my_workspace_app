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
import UsersTimeLogs from "./pages/UsersTimeLogs";

import "./App.css";

const App = () => (
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
          <Route
            path={APP_ROUTES.USERS_TIME_LOGS}
            element={<UsersTimeLogs />}
          />
        </Route>
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
);

export default App;
