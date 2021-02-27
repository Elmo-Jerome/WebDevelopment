import React, { Fragment, useEffect } from 'react' 
import { useHistory } from 'react-router-dom'
import CartUI from './cart-ui'
import './style.scss'


///// REDUX /////
import { useDispatch, useSelector } from 'react-redux'
const mapState = ({user}) => ({
    currentUser: user.currentUser,
})



export default function Cart (props) {
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch()
    const history = useHistory()    
    
    // Redirect to login if ther's no user
    useEffect( () => {
        if (!currentUser) {
            history.push('login')
        }
    },[])

    return (
    <Fragment>
        {currentUser && <CartUI user={currentUser} />}
    </Fragment>
    )
}