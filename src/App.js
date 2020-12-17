import React, { Component } from 'react'
import './default.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, handleProfile } from './firebase/utils'
///// Layouts /////
import MainLayout from './layouts/MainLayout'
///// Pages /////
import Homepage from './pages/Homepage'
import RegistrationPage from './pages/Registration'
import LoginPage from './pages/Login'
import ForgotPass from './pages/ForgotPassword'

import Men from './pages/Men'
import Women from './pages/Women'


class App extends Component {
 state = {
   currentUser: null
 }
  authListener = null

  componentDidMount () {
    this.authListener = auth.onAuthStateChanged( async userAuth => {
      if (!userAuth) {
       this.setState({
         currentUser: null
       })
      } else {
        // Fetch User Ref 
        const userRef = await handleProfile(userAuth)
        // Set State on Fetch 
        userRef.onSnapshot(user => {
          this.setState({
            currentUser: {
              id: user.id,
              ...user.data()
            }
          })
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
            <Route exact path="/registration" 
              render={() => currentUser ? <Redirect to="/" /> : (
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
            <Route exact path="/forgotpassword" render={()=> (
              <MainLayout currentUser={currentUser}>
                <ForgotPass />
              </MainLayout>
            )} />
          </Switch>
        </div>
    );
  }
}

export default App;
