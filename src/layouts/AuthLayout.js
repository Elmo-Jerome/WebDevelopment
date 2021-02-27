import React, { Fragment } from 'react'
import Header from '../components/Header'
import NavigationBar from '../components-alt/NavigationBar'
import Logo from './logo/LOGO-NAME-nav.png'

export default function AuthLayout (props) {
    return(
        <Fragment>
            {/* <Header Logo={Logo} /> */}
            <NavigationBar Logo={Logo} />
            <div className="content">
                { props.children }
            </div>
        </Fragment>
    )
}