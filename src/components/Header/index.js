import React, { useState, useEffect, Fragment } from 'react'
import { auth } from '../../firebase/utils'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, checkUserSession } from '../../redux/Actions'
import { IconButton, Button } from '@material-ui/core'
// import Logo from '../../assets/circuit.svg'
import Logo from '../../assets/microchip.png'
import './style.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
})


const Header = props => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(mapState)
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        currentUser ? setUser(currentUser) : setUser(null)
    }, [currentUser])

    const Logout = async() => {
        await auth.signOut()
            .then(()=>{
                dispatch(logoutUser())
            })
    }
    useEffect( () => {
        dispatch(checkUserSession())
    },[])
    

    return (
        <header className="header">
           <div className="header-wrap">
            <div className="logo-container">
                <Link to="/">
                   {/* <IconButton onClick={() => console.log('/home')}>
                        <img src={Logo}  className="logo-alt"/>
                   </IconButton> */}
                   <Button 
                    className="logo"
                    fullWidth
                    startIcon={<img src={Logo}  className="logo-alt"/>}
                   >PC Mechanic</Button>
                </Link>
            </div>        
            <div className="nav-items-grid">
               {!user && 
               <Fragment>
                    <Link to="/registration">
                        <Button className="nav-item sign-up">
                         <a>SIGN UP</a>
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button className="nav-item login">
                            <a>LOGIN</a>
                        </Button>
                    </Link>
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