import React, { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = props => {

    return (
        <Fragment>
            <Header currentUser={props.currentUser} />
            <div className="content">
                { props.children }
            </div>
            <Footer />
        </Fragment>
    )
}

export default MainLayout