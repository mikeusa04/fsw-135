import React from "react";
import Issue from "./Issue.js";

export default function IssueList(props) {
  const { userIssues, del } = props;
  return (
    <div className="issueGrid">
      {userIssues.map((issue) => (
        <Issue {...issue} del={del} key={issue._id} />
      ))}
    </div>
  );
}