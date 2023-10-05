import { useNavigate, Link } from "react-router-dom";

import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <section style={{ textAlign: "center" }}>
      <h1>Домашня сторінка</h1>
      <br />
      <Link to="/admin">Адмін сторінка</Link>
      <div>
        <button style={{ marginTop: "12px" }} onClick={signOut}>
          Вихід
        </button>
      </div>
    </section>
  );
};

export default Home;
