import React, { Fragment, Component } from 'react'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
// import Button from '../Forms/Button'
import { auth, handleProfile } from '../../firebase/utils'
import './style.scss' 

const styles = {
    marginTop: {
        marginTop: "1rem",
    }
}

// Initial State
const initialState = {
    // Field Values
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Validation
    validDisplayName: false,
    validEmail: false,
    validPassword: false,
    submitted: false,
    enable: false,
    acknowledged: false,
    disableTextField: false,
}


class RegistrationForm extends Component  {

    state = {
        ...initialState
    }
    

    changeHandler = e => {
        if (e.target.value) {
            this.setState({
                [e.target.id]: e.target.value, 
            })
        }
    }
    
    displayNameValidation = () => {
        const  { displayName, validDisplayName } = this.state
        const displayNameRegex =/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
        if(displayNameRegex.test(displayName) && !validDisplayName) {
            console.log("Username set")
            this.setState({validDisplayName: true})
        } else if (!displayNameRegex.test(displayName) && validDisplayName) {
            this.setState({validDisplayName: false})
        }
    }
    emailValidation = () => {
        const { email, validEmail } = this.state
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

        if (emailRegex.test(email) && !validEmail) {
            console.log('Email set')
            this.setState({ validEmail: true })
        } else if (!emailRegex.test(email) && validEmail) {
            this.setState({ validEmail: false })
        }

    }
    passwordValidation = () => {    
        const { password, confirmPassword, validPassword } = this.state
        if(password && password === confirmPassword && !validPassword) {
            console.log("password set")
            this.setState({ validPassword: true })
        } else if (password && password !== confirmPassword && validPassword) {
            this.setState({ validPassword: false })
        }
    }

    formChecker = () => {
        const { 
            validDisplayName, 
            validEmail, 
            validPassword,
            enable,
            } = this.state

            this.displayNameValidation()
            this.emailValidation()
            this.passwordValidation()
            

            if (validDisplayName  && validEmail  && validPassword  && !enable ) { 
                this.setState({ enable: true })
            } else if (enable === true && (!validDisplayName || !validEmail || !validPassword)){
                this.setState({ enable: false })
            }
    }

    // formCheck 
    componentDidUpdate (prevState) {
        if(this.state !== prevState && this.state.submitted === true ){
            this.formChecker() 
        }
        if (this.state !== prevState && this.state.acknowledged) {
            this.setState({
                // Field Values
                displayName: "",
                email: "",
                password: "",
                confirmPassword: "",
            
                // Validation
                validDisplayName: false,
                validEmail: false,
                validPassword: false,
                submitted: false,
                enable: false,
                acknowledged: false,
            })
        }
    }

    CreateUser = async () => {
        const { enable, email, password, displayName } = this.state
        await this.formChecker()
        if(enable) {
            // User Creation
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password)
                console.log(user)
                await handleProfile(user, { displayName })
                this.setState({
                    acknowledged: true
                })
                console.log("submit")
            } catch (err) { console.log(err) }
       }
    }

    // Button Click Callback
    handleSubmit = async (e) => {
        e.preventDefault()
        const { enable, email, password, displayName } = this.state

        this.setState({submitted: true })
        await this.formChecker()
        this.CreateUser()
    }


    
    render() {
        const { 
            displayName,
            email,
            password,
            confirmPassword,
            validDisplayName, 
            validEmail, 
            validPassword,
            submitted,
            disableTextField,
            } = this.state
            console.log(email)
        const { classes } = this.props
        return (
            <Fragment>
                <div className="registration-box">
                    <p className="form-label" > 
                        Create an Account 
                    </p>
     
                    <form className="registration-form" onSubmit={this.handleSubmit.bind(this)}>
                        <TextField
                            className={classes.marginTop}
                            label= "Username"
                            id="displayName"
                            type="text"
                            fullWidth
                            value={displayName}
                            disable={disableTextField}

                            // Customizations
                            inputProps={{ style: { fontSize: "1.6rem" }}}
                            InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                            FormHelperTextProps ={{ style: { fontSize: "1.1rem" } }}
                            FormHelperTextProps ={{ style: { fontSize: "1.1rem" } }}
                            onChange={this.changeHandler.bind(this)}
                            
                            // Error Handling
                            error={!validDisplayName && submitted}   
                            helperText={!validDisplayName && submitted ? "*Invalid Username (8-20 characters)*" : "(8-20 characters)"}                        
                        />
                        <TextField
                            className={classes.marginTop}
                            label="Email"
                            id="email"
                            type="email"
                            fullWidth
                            value={email}
                            disable={disableTextField}

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
                            className={classes.marginTop}
                            label="Password"
                            id="password"
                            type="password"
                            fullWidth
                            value={password}
                            disable={disableTextField}

                            // Customizations
                            inputProps={{ style: { fontSize: "1.6rem" }}}
                            InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                            FormHelperTextProps ={{ style: { fontSize: "1.1rem" } }}
                            onChange={this.changeHandler.bind(this)}  
                            
                             // Error Handling
                             error={ !password && submitted}   
                             helperText={!password && submitted ? "*Empty Field*" : ""}       
                        />
                         <TextField
                            className={classes.marginTop}
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            disable={disableTextField}

                            // Customizations
                            inputProps={{ style: { fontSize: "1.6rem" }}}
                            InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                            FormHelperTextProps ={{ style: { fontSize: "1.1rem" } }}
                            onChange={this.changeHandler.bind(this)}
                            
                            // Error Handling
                            error={!validPassword && submitted}   
                            helperText={!validPassword && submitted ? "*Paswords don't match*" : ""}                                             
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            onClick={()=>this.setState({disableTextField: true})}
                            disable={disableTextField}
                            className={classes.marginTop}
                            style={{
                                fontSize: "1.3rem",
                                width: "100%",
                            }}
                        >
                            Sign Up
                        </Button>
                        {/* <Button 
                            name="Sign up" 
                            enabled={true} 
                            action={this.handleSubmit.bind(this)} 
                        /> */}
                    </form>
                </div>
            </Fragment>
        )
    }
    
}

export default withStyles(styles)(RegistrationForm)