import React, { useEffect } from 'react'
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
import Dashboard from './pages/Dashboard'
import Men from './pages/Men'
import Women from './pages/Women'

////// hoc /////
import WithAuth from './components/hoc/withAuth'

///// Redux /////
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from './redux/Actions'
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const App = props => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapState)

  useEffect(()=>{

    const authListener = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
         // Fetch User Ref 
         const userRef = await handleProfile(userAuth)
         // Set State on Fetch 
         userRef.onSnapshot(user => {
            dispatch(setCurrentUser ({  
              id: user.id,
              ...user.data() 
            }))
         })     
      } else {
        dispatch(setCurrentUser(userAuth))
      }
      
    })

    return () => {
      authListener()
    }
  },[])


    return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <MainLayout>
                <Homepage />
              </MainLayout>)}
            />
            <Route exact path="/registration" 
              render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout>
                  <RegistrationPage />
                </MainLayout>)}
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
              render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout>
                  <LoginPage />
                </MainLayout>
            )} />
            <Route exact path="/forgotpassword" render={()=> (
              <MainLayout>
                <ForgotPass />
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
