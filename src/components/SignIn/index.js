import React, { Component } from 'react'
import './style.scss'
import { TextField, Button } from "@material-ui/core"
import { withStyles } from '@material-ui/styles'
import { auth, signInWithGoogle } from '../../firebase/utils' 
import { Link } from 'react-router-dom'

const styles = {
    margin: {
        marginBottom: "1rem",
    }
}

const initialState = {
    email: "",
    password: "",

    validPassword: false,
    validEmail: false,
    enable: false,
    submitted: false,
    error: false,
}

class Login extends Component {

    state = {
        ...initialState
    }

    changeHandler = e => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    
    // Form Validation
    passwordValidation = (password, validPassword) => {
        if(password && !validPassword) {
            this.setState({validPassword: true})
        } else if (!password && validPassword) {
            this.setState({validPassword: false})
            this.setState({error: true})
        }
    }
    emailValidation = (email, validEmail) => {
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if (emailRegex.test(email) && !validEmail) {
            this.setState({ validEmail: true })
        } else if (!emailRegex.test(email) && validEmail) {
            this.setState({ validEmail: false })
        }
    }
    formChecker = () => {
        const { password, email, validEmail, validPassword, submitted, enable } = this.state

        this.passwordValidation(password, validPassword)
        this.emailValidation(email, validEmail)

        if (validEmail && validPassword && submitted && !enable) {
            this.setState({enable: true})
        } else if (enable && (!validEmail || !validPassword) ) {
            this.setState({enable: false})
        }
    }

    componentDidUpdate (prevState) {
        const { submitted } = this.state
        if (this.state !== prevState && submitted) {
            this.formChecker()
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = this.state
        this.setState({ submitted: true })
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ 
                email: "",
                password: "",
    
                validPassword: false,
                validEmail: false,
                enable: false,
                submitted: false,
                error: false,
            })
        } catch (err) {
            // this.setState({error: err.message})
            
        }
        
    }

    render () {
        const { classes } = this.props
        const { email, password, validEmail, submitted, error } = this.state
        return (
            <div className="signin">
                <div className="signin-text">
                    LOGIN
                </div>
                <form onSubmit={this.handleSubmit.bind(this)} className="signin-form">
                    <TextField 
                        className={classes.margin}
                        label="Email"
                        id="email"
                        type="email"
                        fullWidth
                        value={email}
                        

                        // Customizations
                        inputProps={{ style: { fontSize: "1.6rem" }}}
                        InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                        FormHelperTextProps ={{ style: { fontSize: "1.1rem" } }}
                        onChange={this.changeHandler.bind(this)}
                        
                        // Error Handling
                        error={!validEmail && submitted}   
                        helperText={!validEmail && submitted ? "*Invalid Email*" : ""}                                             
                    />
                    <TextField
                            className={classes.margin}
                            label="Password"
                            id="password"
                            type="password"
                            fullWidth
                            value={password}
                            

                            // Customizations
                            inputProps={{ style: { fontSize: "1.6rem" }}}
                            InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                            FormHelperTextProps ={{ style: { fontSize: "1.1rem" } }}
                            onChange={this.changeHandler.bind(this)}  
                            
                             // Error Handling
                             error={ !password && submitted && error}   
                             helperText={!password && submitted && error ? "*Empty Field / Wrong Password*" : ""}       
                        />

                    <Button 
                        className={classes.margin}
                        color="primary" 
                        variant="contained"
                        type="submit" 
                        onClick={this.handleSubmit.bind(this)} 
                        style={{
                            fontSize: "1.3rem",
                            width: "100%",
                        }}
                    >
                        Login
                    </Button>
                    <Button 
                        className={classes.margin}
                        color="secondary"
                        variant="contained"
                        onClick={signInWithGoogle}  
                        style={{
                            fontSize: "1.3rem",
                            width: "100%",
                        }}
                    >
                        Continue with Google
                    </Button>
                </form>  
                <Link to="/forgotpassword" className="forgot-password">
                    Forgot Password
                </Link>
            </div>
            )
    }
}

export default withStyles(styles)(Login)