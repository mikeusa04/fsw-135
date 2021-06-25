import React, { useContext, useEffect } from "react";
import IssueList from "./IssueList.js";
import { UserContext } from "../Context/userContext.js";

export default function Profile() {
  useEffect(() => {
    getUserIssues();
  }, []);
  const {
    user: { username },
    userIssues,
    getUserIssues,
    deleteIssue
  } = useContext(UserContext);

  return (
    <div className="profile">
      <h1 className="profileUserName">Welcome {username}!</h1>
      <h2 className="userIssues">Your issues</h2>
      <IssueList userIssues={userIssues} del={deleteIssue}/>
    </div>
  );
}