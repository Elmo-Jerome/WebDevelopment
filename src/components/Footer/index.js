import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { Button, TextField, TextareaAutosize, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Facebook, Twitter, Instagram, LinkedIn } from '@material-ui/icons'
import { Formik, Form, useField } from 'formik' 
import './style.scss'

const useStyle = makeStyles({
    iconLogo: {
        color: "white", 
        fontSize: "3rem",
    },
    fbLogo: {
        paddingLeft: "0",
    }
})
const CustomTextField = (props) => {
    const [field, meta] = useField(props)

    return (
        <Fragment>
            <TextField 
                {...field}
                {...props}
                error={meta.touched && meta.error}
                className="email"
                helperText={meta.touched ? meta.error : ''}
                inputProps={{ style: { fontSize: "1.6rem", color: 'white',}}}
                InputLabelProps={{ style: { fontSize: "1.6rem", color: 'white', }}}
                FormHelperTextProps={{ style: { fontSize: "1.1rem", color: 'white', } }}
                fullWidth/>
        </Fragment>
    )
}

const Footer = props => {
    const classes = useStyle()

    const handleSubmit = async(values) => {
        try {
            await console.table( values )
            alert('Thank you for leaving a message!')
        } catch (err) { alert("Something went wrong... you can reach us at our email tho!") }
    }
    return (
        <Fragment>  
            <div className="footer">
                <div className="footer-content">
                    <div className="logo-footer">
                        <h1>CHROME WOLVES</h1>
                        <div className="icons-button-grid">
                            <IconButton className={classes.iconLogo}>
                                <Facebook className={classes.fbLogo} fontSize="inherit"/>
                            </IconButton>
                            <IconButton className={classes.iconLogo}>
                                <Twitter fontSize="inherit"/>
                            </IconButton>
                            <IconButton className={classes.iconLogo}>
                                <Instagram fontSize="inherit"/>
                            </IconButton>
                            <IconButton className={classes.iconLogo}>
                                <LinkedIn fontSize="inherit"/>
                            </IconButton>
                        </div>
                    </div>

                    <div className="about">
                        <h2>About Us</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                    </div>

                    <div className="contact">
                        <h2>Contact Us</h2>
                        <p>Buina Village, Asura</p>
                        <p>+63 949 1234 789 | +02 7210-1234</p>
                        <p>example@example.com</p>
                    </div>

                    <div className="suggestions">
                        <h2>Suggestions</h2>
                        
                        <Formik
                            initialValues={{
                                email: '',
                                message: '',
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string().email('Invalid Email').required('Required'),
                                message: Yup.string().required('Required'),
                            })}
                            onSubmit={ async (values, {resetForm}) => {
                                await handleSubmit(values)
                                resetForm()
                            }}>
                            {props => (
                                <Form>
                                    <CustomTextField 
                                        label="Type Your Email Here"
                                        name="email"
                                        placeholder="Your Email"
                                        type="email"/>

                                    <TextareaAutosize 
                                        name="message"
                                        placeholder=" Leave us a message!" />
                                       
                                    <Button 
                                        variant="outlined"
                                        type="submit" >
                                        Send Email
                                    </Button>
                                    
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
                <div className="copyright"> Chrome Wolves | © 2021 All Rights Reserved</div>
            </div>
        </Fragment>
    )
}

export default Footer