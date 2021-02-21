import React, { Fragment, useState } from 'react'
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
  

export default function NavigationsBar (props) {
    const { Logo } = props
    const [toggle, setToggle] = useState(false)


    return (
        <Fragment>
              
            {/* <!-- Navigation --> */}
            <Navbar className="navbar-styles" dark expand="lg">
                <NavbarBrand><img src={Logo} alt="Home"/></NavbarBrand>
                <NavbarToggler onClick={() => setToggle(!toggle)} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"/>

                <Collapse id="navbarSupportedContent" isOpen={toggle} navbar>
                    <Nav className="" navbar>
                        <NavItem>
                            <NavLink href="index.html">Home </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="products.html">Products</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Services
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem> PC Build </DropdownItem>
                                <DropdownItem> Repair </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Contact Us</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink href="login.html">Login</NavLink>
                        </NavItem>
                    </Nav>
                        <Form className="ml-auto my-2 my-lg-0">
                            <InputGroup className="ml-auto">
                                <Input className="form-control mr-sm-3" type="search" placeholder="Search..." aria-label="Search"/>
                                <Button className="btn btn-nav my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></Button>
                            </InputGroup>                               
                        </Form>
                </Collapse>
            </Navbar>
        </Fragment>
    )
}
