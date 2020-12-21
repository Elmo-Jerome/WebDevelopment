import React, { useState, useEffect, Fragment } from 'react'
import { auth } from '../../firebase/utils'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Header = props => {
    const { currentUser } = useSelector(mapState)
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        currentUser ? setUser(currentUser) : setUser(null)
    }, [currentUser])

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
                        <a onClick={() => auth.signOut()}>LOGOUT</a>
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