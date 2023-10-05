import useAuth from "./useAuth";
import { API_URL } from "../constants";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch(`${API_URL}refresh`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    const result = await response.json();

    setAuth({ ...auth, accessToken: result.accessToken, roles: result.roles });

    return result.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
