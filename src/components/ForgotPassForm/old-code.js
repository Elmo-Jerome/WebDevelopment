


import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { auth } from '../../firebase/utils'
import './style.scss'

const useStyle = makeStyles({
    margin: {
        marginTop: "1rem",
    },
})

const ForgotPassForm = props => {
    const [ email, setEmail ] = useState(null)
    const [ validEmail, setValidEmail ] = useState(false)
    const [ submitted, setSubmitted ] = useState(false)

    const classes = useStyle()
    const history = useHistory()

    

    const emailValidation = () => {
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if(emailRegex.test(email) && !validEmail) {
            setValidEmail(true)
        } else if (!emailRegex.test(email) && validEmail) {
            setValidEmail(false)
        }
    }

    const changeHandler = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()       
       try {
            await auth.sendPasswordResetEmail(email)
            .then(() => console.log("send email"))
            .catch (() => console.log("something went wrong"))
            .then(()=>history.goBack())
       } catch (err) {
           console.log(err)
       }
    }

    useEffect(()=>{
        emailValidation()
    },[submitted,email])

    return (
        <Fragment>
            <div className="form-box">
                <div className="forgot-password-text">Forgot Password</div> 
                <form onSubmit={handleSubmit}>
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
                        onChange={changeHandler}
                        
                        // Error Handling
                        error={!validEmail && submitted}   
                        helperText={!validEmail && submitted ? "*Invalid Email*" : ""}                                             
                    />
                    <Button 
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                        type="submit"
                        onClick={()=>setSubmitted(true)}
                        style={{
                            fontSize: "1.3rem",
                            width: "100%",
                        }}
                    >
                        Check Email
                    </Button>
                </form>
            </div>
        </Fragment>
    )
}

export default ForgotPassForm

