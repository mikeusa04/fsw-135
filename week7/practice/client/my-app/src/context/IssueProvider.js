import React, { useState } from 'react'
import axios from 'axios'
export const IssueContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function IssueProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || "",
    userIssues: [],
    issues: [],
    comments: [],
    errMsg: ""
  }
  const [issueState, setIssueState] = useState(initState)

  function addIssue(newIssue) {
    userAxios.post('/api/issue', newIssue)
      .then(res => {
        setIssueState(prevState => ({
          ...prevState,
          issues: [...prevState.issues, res.data]
        }))
        getUserIssues()
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getUserIssues() {
    userAxios.get('/api/issue/user')
      .then(res => {
        setIssueState(prevState => ({
          ...prevState,
          userIssues: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getAllIssues() {
    userAxios.get('/api/issue/all')
      .then(res => {
        setIssueState(prevState => ({
          ...prevState,
          issues: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addComment(comment, issueID) {
    const newComment = {
      issue: issueID,
      description: comment.comment
    }
    userAxios.post('/api/comment', newComment)
      .then(res => {
        getIssueComments(issueID)
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getIssueComments(issueID) {
    userAxios.get(`/api/comment/issue/${issueID}`)
      .then(res => {
        let tempComments = [...issueState.comments]
        let index = tempComments.findIndex(comment => comment.issueID === issueID);
        let tempIssueID = issueID;
        if(index === -1 && res.data.length > 0)
        {
          let newComments = {
            issueID: tempIssueID,
            comments: res.data
          }    
          tempComments.push(newComments)
          setIssueState(prevState => ({
            ...prevState,
            comments: tempComments
          }))
        } else {
          tempComments[index] = {...tempComments[index], comments: [res.data]}
          setIssueState(prevState => ({
            ...prevState,
            comments: tempComments
          }))
        }
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  return (
    <IssueContext.Provider
      value={{
        ...issueState,
        getUserIssues,
        getAllIssues,
        addIssue,
        addComment,
        getIssueComments
      }}>
      { props.children}
    </IssueContext.Provider>
  )
}