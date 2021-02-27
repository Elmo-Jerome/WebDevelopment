import React, { Fragment, useEffect } from 'react'
import './style.scss'
import CheckoutUI from './checkout-ui'

import { useFirestore } from '../../components/CustomHooks'

///// REDUX /////
import { useSelector, useDispatch } from 'react-redux'
const mapState = ({user}) => ({
    currentUser: user.currentUser,
})

 
export default function Checkout (props) {
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch()

    return (
        <Fragment>
            {currentUser && <CheckoutUI user={currentUser} />}
        </Fragment>
    )
}

