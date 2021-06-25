/*import React, {useContext} from 'react'
import IssueForm from './IssueForm'
import {UserContext} from "../context/UserProvider"
import IssueList from './IssueList'
// import Issue from './Issue'

export default function Profile(){
  const { 
    user: { username}, addIssue, issues } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome Member: {username}</h1>
      <h3>Add an issue</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>your issues</h3>
      <IssueList issues={issues}/>
    </div>
  )
}*/


import React, { useContext, useEffect } from "react";
import IssueList from "./IssueList.js";
import { UserContext } from "./../context/UserProvider.js";

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