import React, { useContext, useEffect } from 'react'
import IssueList from './IssueList.js'
import { IssueContext } from '../context/IssueProvider.js'

export default function IssuePage() {
  const {
    getAllIssues,
  } = useContext(IssueContext)

  useEffect(() => {
   getAllIssues()
  }, []);

  return (
    <div className="issue-page">
      <IssueList />
    </div>
  )
}
