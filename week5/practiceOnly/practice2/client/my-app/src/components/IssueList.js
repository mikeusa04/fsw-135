import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props) {
  const { issues } = props
  const issueData = issues.map(issue => {
    return (
      <Issue
        {...issue}
        key={issue._id}
      />
    )
  })
  return (
    <div className="issue-list">
      {/*      { issues.map(issue => <Issue {...issue} key={issue._id}/>) } */}
      {issueData}
    </div>
  )
}