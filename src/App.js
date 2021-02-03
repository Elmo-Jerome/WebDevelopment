import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './default.scss'

///// Layouts /////
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
///// Pages /////
import LandingPage from './pages/Landing'
import Homepage from './pages/Homepage'
import RegistrationPage from './pages/Registration'
import LoginPage from './pages/Login'
import ForgotPass from './pages/ForgotPassword'
import PasswordResetSent from './pages/PasswordResetSent'
import Dashboard from './pages/Dashboard'
import Men from './pages/Men'
import Women from './pages/Women'

////// hoc /////
import WithAuth from './components/hoc/withAuth'

///// Redux /////
import { checkUserSession } from './redux/Actions'
import { useDispatch } from 'react-redux'

const App = props => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkUserSession())
  },[])

    return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
                <MainLayout>
                  <LandingPage />
                  {/* <Homepage /> */}
                </MainLayout>)}
              />
              <Route exact path="/registration" 
                render={() => (
                  <AuthLayout>
                    <RegistrationPage />
                  </AuthLayout>)}
              />
              <Route exact path="/men" render={() => (
                <MainLayout>
                  <Men />
                </MainLayout>
              )} />
              <Route exact path="/women" render={() => (
                <MainLayout>
                  <Women />
                </MainLayout>
              )} />
              <Route exact path="/login" 
                render={() => (
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
              )} />
              <Route exact path="/forgotpassword" render={()=> (
                <MainLayout>
                  <ForgotPass />
                </MainLayout>
              )} />
              <Route exact path="/password-reset-sent" render={()=>(
                <MainLayout>
                  <PasswordResetSent />
                </MainLayout>
              )} />
              <Route exact path="/dashboard" render={()=> (
                <WithAuth>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </WithAuth>
              )} />
          </Switch>
        </div>
    );
  
}

export default App


// <Route exact path="/" render={() => (
//   <MainLayout>
//     <Homepage />
//   </MainLayout>)}
// />
// <Route exact path="/registration" 
//   render={() => currentUser ? <Redirect to="/" /> : (
//     <MainLayout>
//       <RegistrationPage />
//     </MainLayout>)}
// />
// <Route exact path="/men" render={() => (
//   <MainLayout>
//     <Men />
//   </MainLayout>
// )} />
// <Route exact path="/women" render={() => (
//   <MainLayout>
//     <Women />
//   </MainLayout>
// )} />
// <Route exact path="/login" 
//   render={() => currentUser ? <Redirect to="/" /> : (
//     <MainLayout>
//       <LoginPage />
//     </MainLayout>
// )} />
// <Route exact path="/forgotpassword" render={()=> (
//   <MainLayout>
//     <ForgotPass />
//   </MainLayout>
// )} />
// <Route exact path="/password-reset-sent" render={()=>(
//   <MainLayout>
//     <PasswordResetSent />
//   </MainLayout>
// )} />
//  <Route exact path="/dashboard" render={()=> (
//   <WithAuth>
//     <MainLayout>
//       <Dashboard />
//     </MainLayout>
//   </WithAuth>
// )} />