import React from 'react'
import './default.scss'
import { Route, Switch } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

///// Pages /////
import Homepage from './pages/Homepage'
import RegistrationPage from './pages/Registration'

import Men from './pages/Men'
import Women from './pages/Women'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout>
            <Homepage />
          </MainLayout>)}
         />
        <Route exact path="/registration" render={() => (
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
      </Switch>
    </div>
  );
}

export default App;
