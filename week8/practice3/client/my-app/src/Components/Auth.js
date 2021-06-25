import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import { UserContext } from "../Context/userContext";

const initInputs = { username: "", password: "" };

export default function Auth() {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);
  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
    console.log(signup);
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
    // console.log(login, inputs);
  }

  function toggleForm() {
    setToggle((prev) => !prev);
    resetAuthErr();
  }
  return (
    <div className="authGrid">
      <div className="auth-container">
        <h1 className="authHeader">Log In / Sign Up</h1>
        {!toggle ? (
          <>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText="Sign up"
              errMsg={errMsg}
            />
            <button className="toggle" onClick={() => toggleForm()}>
              Already a member?
            </button>
          </>
        ) : (
          <>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleLogin}
              inputs={inputs}
              btnText="Sign in"
              errMsg={errMsg}
            />
            {console.log(inputs)}
            <button className="toggle" onClick={() => toggleForm()}>
              Not a member?
            </button>
          </>
        )}
      </div>
    </div>
  );
}