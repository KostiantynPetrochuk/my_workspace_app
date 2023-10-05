import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useFetchPrivate from "../hooks/useFetchPrivate";

const Users = () => {
  const [users, setUsers] = useState();
  const fetchPrivate = useFetchPrivate();
  const usersFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = async () => {
    try {
      const response = await fetchPrivate("users");
      setUsers(response);
    } catch (error) {
      console.log(error);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <article>
      <h2>Користувачі</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>Нема користувачів для відображення</p>
      )}
    </article>
  );
};

export default Users;
