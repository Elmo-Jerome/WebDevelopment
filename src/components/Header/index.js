import React, { useState, useEffect, Fragment } from 'react'
import { auth } from '../../firebase/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.scss'



const Header = props => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        props.currentUser ? setUser(props.currentUser) : setUser(null)
    }, [props.currentUser])

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
                        <Link to="/registration">REGISTER</Link>
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
                </Fragment>
                }
            </div>
           </div>
        </header>
    )

}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)