import React, { Fragment } from 'react'
// import Header from '../components/Header'
import NavigationBar from '../components-alt/NavigationBar'
import Footer from '../components/Footer'
// import Footer from '../components-alt/Footer'
import Logo from './logo/LOGO-NAME-nav.png'

const MainLayout = props => {

    return (
        <Fragment>
            {/* <Header Logo={Logo} currentUser={props.currentUser} /> */}
            <NavigationBar Logo={Logo} />
            <div 
            // className="content"
                >{ props.children }
            </div>
            <Footer />
        </Fragment>
    )
}

export default MainLayout