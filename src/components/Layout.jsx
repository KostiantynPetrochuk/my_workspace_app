import { Outlet } from "react-router-dom";

import Header from "./Header";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <main>
      {auth?.accessToken && <Header />}
      <Outlet />
      {/* footer */}
    </main>
  );
};

export default Layout;
