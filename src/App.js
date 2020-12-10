import React, { Component } from 'react'
import './default.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth } from './firebase/utils'
///// Layouts /////
import MainLayout from './layouts/MainLayout'
///// Pages /////
import Homepage from './pages/Homepage'
import RegistrationPage from './pages/Registration'
import LoginPage from './pages/Login'

import Men from './pages/Men'
import Women from './pages/Women'


class App extends Component {
 state = {
   currentUser: null
 }
  authListener = null

  componentDidMount () {
    this.authListener = auth.onAuthStateChanged(userAuth => {
      if (!userAuth) {
        this.setState({
          currentUser: null
        })
      } else {
        this.setState({
          currentUser: userAuth
        })
      }
    })
  }

  componentWillUnmount () {
    this.authListener()
  }
  
  render () { 
    const { currentUser } = this.state

    return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <MainLayout currentUser={currentUser}>
                <Homepage />
              </MainLayout>)}
            />
            <Route exact path="/registration" render={() => (
              <MainLayout currentUser={currentUser}>
                <RegistrationPage />
              </MainLayout>)}
            />
            <Route exact path="/men" render={() => (
              <MainLayout currentUser={currentUser}>
                <Men />
              </MainLayout>
            )} />
            <Route exact path="/women" render={() => (
              <MainLayout currentUser={currentUser}>
                <Women />
              </MainLayout>
            )} />
            <Route exact path="/login" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <LoginPage />
              </MainLayout>
            )} />
          </Switch>
        </div>
    );
  }
}

export default App;
