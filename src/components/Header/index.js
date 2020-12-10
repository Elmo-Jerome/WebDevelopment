import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'



const Header = props => {

    return (
        <header className="header">
           <div className="header-wrap">
            <div className="logo-container">
                <Link to="/">
                        <div className="logo" />
                </Link>    
            </div>        
            <div className="nav-items-grid">
                <div className="nav-item">
                    <Link to="/registration">REGISTER</Link>
                </div>
                <div className="nav-item">
                    <Link to="/login">LOGIN</Link>
                </div>
            </div>
           </div>
        </header>
    )

}

export default Header