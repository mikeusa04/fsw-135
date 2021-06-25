import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import IssuePage from './components/IssuePage.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from './components/ProtectedRoute.js'

export default function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      <Navbar logout={logout} />
      <Switch>
        <Route
          exact path="/"
          render={() => token ? <Redirect to="/profile" /> : <Auth />}
        />
        <ProtectedRoute
          path="/issues"
          component={IssuePage}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          redirectTo='/'
          token={token}
        />
      </Switch>
    </div>
  )
}