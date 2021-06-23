import React, { useContext, useEffect } from 'react'
import Issue from './Issue.js'
import { IssueContext } from '../context/IssueProvider.js'

export default function IssueList(props) {
  const {
    issues,
  } = useContext(IssueContext)

  return (
    <div className="issue-list">
      {issues && issues.length > 0
      ? issues.map(issue => {
        return <Issue {...issue} key={issue._id}/>
      })
      : "No Current Issues"}
    </div>
  )
}