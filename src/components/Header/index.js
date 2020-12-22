import React, { useState, useEffect, Fragment } from 'react'
import { auth } from '../../firebase/utils'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/Actions'
import './style.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    signInSuccess: user.signInSuccess,
})


const Header = props => {
    const dispatch = useDispatch()
    const { currentUser, signInSuccess } = useSelector(mapState)
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        currentUser ? setUser(currentUser) : setUser(null)
    }, [currentUser])

    useEffect(()=>{
        console.log(signInSuccess)
    }, [signInSuccess])

    const Logout = async() => {
        await auth.signOut()
            .then(()=>{
                dispatch(logoutUser())
            })
    }

    return (
        <header className="header">
           <div className="header-wrap">
            <div className="logo-container">
                <Link to="/">
                        <div className="logo" />
                </Link>    
            </div>        
            <div className="nav-items-grid">
               {!user && 
               <Fragment>
                    <div className="nav-item">
                        <Link to="/registration">SIGN UP</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/login">LOGIN</Link>
                    </div>
                </Fragment>
                }
                {user && 
                <Fragment>
                    <div className="nav-item">
                        <a onClick={Logout}>LOGOUT</a>
                    </div>
                    <div className="nav-item">
                        <Link to="/dashboard">MY ACCOUNT</Link>
                    </div>
                </Fragment>
                }
            </div>
           </div>
        </header>
    )

}

export default Header