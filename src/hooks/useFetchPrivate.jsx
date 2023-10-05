import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { API_URL } from "../constants";

const useFetchPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const fetchPrivate = async (url, options = {}) => {
    if (!options.headers) {
      options.headers = {};
    }
    if (!options.method) {
      options.method = "GET";
    }

    options.headers["Authorization"] = `Bearer ${auth?.accessToken}`;

    options.headers["Content-Type"] = "application/json";
    options.credentials = "include";
    options.mode = "cors";
    options.cache = "no-cache";
    options.redirect = "follow";
    options.referrerPolicy = "no-referrer";

    try {
      const response = await fetch(`${API_URL}${url}`, options);

      if (response.status === 403) {
        const newAccessToken = await refresh();
        options.headers["Authorization"] = `Bearer ${newAccessToken}`;
        const newResponse = await fetch(`${API_URL}${url}`, options);
        const newResult = await newResponse.json();
        return newResult;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  return fetchPrivate;
};

export default useFetchPrivate;
