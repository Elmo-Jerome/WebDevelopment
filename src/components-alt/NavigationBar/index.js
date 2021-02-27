import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Form,
    Button,
    InputGroup,
    Input,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import "./style.scss"

//// MATERIAL-UI ////
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

//// REDUX ////
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, checkUserSession } from '../../redux/Actions'
const mapState = ({user}) => ({
    currentUser: user.currentUser
})
  
const useStyle = makeStyles({
    iconLogo: {
        color: "white", 
        fontSize: "3rem",
    },
})

export default function NavigationsBar (props) {
    const { currentUser } = useSelector(mapState)
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const classes = useStyle()    
    const history = useHistory()
    const { Logo } = props

    useEffect( () => {
        dispatch(checkUserSession())
    },[])
    useEffect( () => {},[currentUser])

    const handleLogout = async () => {
        await dispatch(logoutUser())
        history.push('/')
    }


    return (
        <Fragment>
              
            {/* <!-- Navigation --> */}
            <Navbar className="navbar-styles fixed-top" dark expand="lg">
               <div className="nav-container row">
                <NavbarBrand className=""><img src={Logo} alt="Home"/></NavbarBrand>
                    <NavbarToggler className="ml-auto" onClick={() => setToggle(!toggle)} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"/>

                    <Collapse className="ml-auto" id="navbarSupportedContent" isOpen={toggle} navbar>
                        <Nav className="" navbar>
                            <NavItem>
                                <NavLink href="/">Home </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="products">Products</NavLink>
                            </NavItem>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Services
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem> PC Build </DropdownItem>
                                    <DropdownItem> Repair </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Contact Us</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                            {/* If not logged in */}
                            {!currentUser && (
                                <Fragment>
                                    <NavItem>
                                        <NavLink href="login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="registration">Register</NavLink>
                                    </NavItem>
                                </Fragment>
                            )}

                            {/* If logged in */}
                            {currentUser && (
                                <Fragment>
                                    <NavItem>
                                        <NavLink onClick={handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </Fragment>                            
                            )}
                            
                        </Nav>
                            {/* <Form className="ml-auto my-2 my-lg-0">
                                <InputGroup className="ml-auto">
                                    <Input className="form-control mr-sm-3" type="search" placeholder="Search..." aria-label="Search"/>
                                    <Button className="btn btn-nav my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></Button>
                                </InputGroup>                               
                            </Form> */}
                            {currentUser && (
                                <Fragment>
                                        <IconButton className="ml-auto" onClick={()=> history.push('cart') } className={classes.iconLogo} >
                                            <ShoppingCartIcon />
                                        </IconButton>
                                </Fragment>
                            )}
                    </Collapse>
               </div>
            </Navbar>
        </Fragment>
    )
}
