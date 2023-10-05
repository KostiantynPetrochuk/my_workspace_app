import { Link } from "react-router-dom";

import Users from "../components/Users";

const Admin = () => {
  return (
    <section style={{ textAlign: "center" }}>
      <h1>Привіт, адміне!</h1>
      <br />
      <Users />
      <br />
      <div>
        <Link to="/">На головну</Link>
      </div>
    </section>
  );
};

export default Admin;
