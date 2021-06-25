import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { logout, token } = props;
  console.log(token);
  return (
    <div className="navbar">
      {token ? (
        <button className="navBtn">
          <Link to="/profile">Profile</Link>
        </button>
      ) : (
        <></>
      )}

      {token ? (
        <button className="navBtn">
          <Link to="/public">Public</Link>
        </button>
      ) : (
        <></>
      )}
      {token ? (
        <button onClick={logout} className="navBtn">
          Logout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}