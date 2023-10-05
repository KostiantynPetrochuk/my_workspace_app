import { useSelector, useDispatch } from "react-redux";

import { setAuthData } from "../features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const setAuth = (authData) => dispatch(setAuthData(authData));

  return { auth, setAuth };
};

export default useAuth;
