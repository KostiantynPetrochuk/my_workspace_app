import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useFetchPrivate from "../hooks/useFetchPrivate";
import useLoading from "../hooks/useLoading";
import { APP_ROUTES } from "../constants";
import { setUsers, selectUsers } from "../features/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();
  const fetchPrivate = useFetchPrivate();
  const { startLoading, stopLoading } = useLoading();
  const usersFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector(selectUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!usersFetched.current) {
          startLoading();
        }
        const response = await fetchPrivate("users");
        dispatch(setUsers(response));
        stopLoading();
      } catch (error) {
        if (!usersFetched.current) {
          stopLoading();
        }
        console.log(error);
        navigate(APP_ROUTES.LOGIN, {
          state: { from: location },
          replace: true,
        });
      }
    };

    if (usersFetched.current === false) {
      fetchUsers();
      usersFetched.current = true;
    }

    const intervalId = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, fetchPrivate, location, navigate, startLoading, stopLoading]);

  return (
    <article>
      <h2>Користувачі</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>Нема користувачів для відображення</p>
      )}
    </article>
  );
};

export default Users;
