/*import React from 'react'
//import IssueList from './IssueList.js'
//import Issue from './Issue.js'

export default function Public() {
    return (
        <div className="public">
            <h1>Public Page</h1>
        </div>
    )
}*/


import React, { useContext } from "react";
import PublicIssueList from "./publicIssuelist";
import IssueForm from "./IssueForm";
import { UserContext } from "./../context/UserProvider";

export default function Public() {
  const { addIssue, getIssues, issues } = useContext(UserContext);
  
  return (
    <div className="public">
      <IssueForm addIssue={addIssue} getIssues={getIssues} />
      <PublicIssueList
        get={getIssues}
        issues={issues}
      />
    </div>
  );
}