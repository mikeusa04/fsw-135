import React from "react";
export default function AuthForm(props) {
  const {
    handleSubmit,
    btnText,
    handleChange,
    errMsg,
    inputs: { username, password },
  } = props;
  return (
    <form className="authForm">
      <input
        className="userName"
        type="text"
        onChange={handleChange}
        name="username"
        value={username}
        placeholder="User Name"
      ></input>
      <input
        className="password"
        type="text"
        onChange={handleChange}
        name="password"
        value={password}
        placeholder="Password"
      ></input>
      <button className="submitBtn" onClick={handleSubmit}>
        {btnText}
      </button>
      <p className="errMsg">{errMsg}</p>
    </form>
  );
}