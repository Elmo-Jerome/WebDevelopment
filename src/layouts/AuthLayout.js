import React, { Fragment } from 'react'
import Header from '../components/Header'

export default function AuthLayout (props) {
    return(
        <Fragment>
            <Header />
            <div className="content">
                {props.children}
            </div>
        </Fragment>
    )
}