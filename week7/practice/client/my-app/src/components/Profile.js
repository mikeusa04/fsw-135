import React, { useContext, useEffect } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import { UserContext } from '../context/UserProvider.js'
import { IssueContext } from '../context/IssueProvider.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }
  } = useContext(UserContext)

  const {
    addIssue,
    userIssues,
    getUserIssues
  } = useContext(IssueContext)

  useEffect(() => {
    getUserIssues()
    console.log("useEffect ran...");
  }, []);

  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <h3>Add a new political issue:</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>Your current political issues</h3>
      <IssueList issues={userIssues} />
    </div>
  )
}