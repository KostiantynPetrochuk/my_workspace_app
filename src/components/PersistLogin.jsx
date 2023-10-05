import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import useRefreshToken from "../hooks/useRefreshToken";
import { selectPersist } from "../features/persist/persistSlice";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const persist = useSelector(selectPersist);
  const done = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (done.current === false) {
      verifyRefreshToken();
      done.current = true;
    }
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoading}
          onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
