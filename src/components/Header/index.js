import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase/utils'
import { Link } from 'react-router-dom'

///// REDUX /////
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, checkUserSession } from '../../redux/Actions'

//// MATERIAL-UI ////
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

// import Logo from '../../assets/circuit.svg'
// import Logo from '../../assets/microchip.png'
import './style.scss'

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
})

const useStyle = makeStyles({
    iconLogo: {
        color: "white", 
        fontSize: "3rem",
    },

})


const Header = props => {
    const { currentUser } = useSelector(mapState)
    const [ user, setUser ] = useState(null);
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyle()
    const { Logo } = props

    useEffect(() => {
        currentUser ? setUser(currentUser) : setUser(null)
    }, [currentUser])

    const Logout = async() => {
       dispatch(logoutUser())
    }
    useEffect( () => {
        dispatch(checkUserSession())
    },[])
    

    return (
        <header className="header">
           <div className="header-wrap">
            <div className="logo-container">
                <Link to="/">
                   <IconButton onClick={() => console.log('/home')}>
                        <img src={Logo} className="logo-alt"/>
                   </IconButton>
                   {/* <Button 
                    className="logo"
                    fullWidth
                    startIcon={<img src={Logo}  className="logo-alt"/>}
                   >PC Mechanic</Button> */}
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
                            <Button className="nav-item normal-link">
                                <a>LOGIN</a>
                            </Button>
                        </Link>
                    </Fragment>
                }
                {user && 
                    <Fragment>
                        <Link to="/dashboard">
                            <Button onClick={Logout} className="nav-item normal-link">
                                <a>LOGOUT</a>
                            </Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button className="nav-item normal-link">
                                <a>MY ACCOUNT</a>
                            </Button>
                        </Link>
                    </Fragment>
                }  
                <Link to="/products">
                    <Button className="nav-item normal-link">
                        <a>PRODUCTS</a>
                    </Button>
                </Link>
                <Link to="/">
                    <Button className="nav-item normal-link">
                        <a>HOME</a>
                    </Button>
                </Link>
                {user && (
                    <Fragment>
                        <IconButton onClick={()=> history.push('cart') } className={`nav-item-btn ${classes.iconLogo}`} >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Fragment>
                )}
            </div>
           </div>
        </header>
    )

}

export default Header