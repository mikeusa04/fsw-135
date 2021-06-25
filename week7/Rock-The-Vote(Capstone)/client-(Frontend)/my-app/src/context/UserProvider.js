import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext()

//axios interceptor
const userAxios = axios.create()
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || "",
    issues: [],
    userIssues: [],
    errMsg: '',
    issueComments: [],
  }

  const [userState, setUserState] = useState(initState)

  function handleAuthErr(errMsg) {
    setUserState(prevState => ({
      ...prevState, 
      errMsg
    }))
  }

  function resetAuthErr() {
    setUserState(prevState => ({
      ...prevState, 
      errMsg: ''
    }))
  }

  function signup(credentials) {
    console.log(credentials);
    axios.post('/auth/signup', credentials)
      .then(res => {
        const { user, token } = res.data
        console.log(res);
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials) {
    console.log(credentials);
    axios.post('/auth/login', credentials)
      .then(res => {
        console.log(res);
        const { user, token } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
        getUserIssues();
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUserState(initState)
  }

  function addIssue(newIssue) {
    userAxios.post("/api/issue", newIssue)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          userIssues: [...prevState.userIssues, res.data]
        }))
        getIssues()
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getUserIssues() {
    userAxios.get("/api/issue/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          userIssues: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getIssues() {
    userAxios.get("/api/issue")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function getComments(id) {
    userAxios.get(`/api/comment/issue/${id}`)
      .then((res) => {
        console.log(res);
        setUserState((prevState) => ({
          ...prevState,
          issueComments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function deleteIssue(id) {
    userAxios.delete(`/api/issue/${id}`)
      .then((res) => {
        getUserIssues();
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function commentPost(event, newObject) {
    const par = event.target.parentNode;
    const id = par.parentNode.id;
    newObject.issueId = id;
    newObject.userId = userState.user._id;
    console.log(userState.user._id);
    userAxios.post(`/api/comment`, newObject)
      .then()
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <UserContext.Provider value={{ 
      ...userState,
       signup, 
       login, 
       logout,
       addIssue,
       deleteIssue,
       getUserIssues,
       resetAuthErr,
       getIssues,
       commentPost,
       getComments,
       }}>
      { props.children}
    </UserContext.Provider>
  )
}