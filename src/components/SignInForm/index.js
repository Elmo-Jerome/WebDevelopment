import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, useField, Form } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"
import { signInWithGoogle } from '../../firebase/utils'
import './style.scss'

///// REDUX /////
import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, checkUserSession ,passwordResetEmailReset } from '../../redux/Actions'
const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    authError: user.authError,
    passwordResetEmailSent: user.passwordResetEmailSent,
})


const useStyle = makeStyles({
    margins: {
        marginBottom: "0.5rem"
    }
})

const CustomTextField = ({label, ...props}) => {
    const classes = useStyle()
    const [ field, meta ] = useField(props)
    return(
        <Fragment>
            <TextField
                className={classes.margins}
                label={label}
                {...field}
                {...props}
                error={meta.error && meta.touched}
                helperText={meta.touched ? meta.error: ""}

                // Customizations
                // inputProps={{ style: { fontSize: "1.6rem", }}}
                // InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                // FormHelperTextProps={{ style: { fontSize: "1.1rem" } }}
                fullWidth
            />
        </Fragment>
    )
}

const CustomButton = (props) => {
    const classes = useStyle
    return(
        <Fragment>
            <Button
                className={`${classes.margins} ${props.class}`}
                variant="contained"
                type={props.type}
                onClick={props.onClick}
                fullWidth
                style= {{ 
                    marginTop: "1rem", 
                    // fontSize: "1.3rem"
                }}
                color={props.color}
            >
                {props.name}
            </Button>
        </Fragment>
    )
}

const LoginForm = props => {

    const { currentUser, authError, passwordResetEmailSent } = useSelector(mapState)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = async (values) => {
        const { email, password } = values
        await dispatch(emailSignInStart({email, password}))        
    }

    const handleGoogleSignIn = async() => {
     // console.log('handleGoogleSignIn')
     // const { user } = await signInWithGoogle()
     // console.log(user)
     await signInWithGoogle()     
     dispatch(checkUserSession())
    }

    useEffect(async()=>{
        if (passwordResetEmailSent) {
            await dispatch(passwordResetEmailReset())
        }
    },[])

    useEffect( () => {
        if(authError) {
            console.log(authError.errorMsg.code)
            setError(authError.errorMsg.code)
        }
    },[authError])

    useEffect(async()=>{
        if(currentUser) {
            await history.push('/')
        }
    }, [currentUser])

    return (
        <Fragment>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }} 
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid Email')
                        .required('Required'),
                    password: Yup.string()
                        .min(6, 'Minimum of 6 characters')
                        .max(20,'Maximum of 20 chracters')
                        .required('Required'),
                })}
               onSubmit={async (values, { setSubmitting, resetForm}) => {
                   await handleSubmit(values)
                   resetForm()
               }}
            >
                {
                    props => (
                        <Form className="login-form">
                            <h1>Sign in</h1>
                           {authError && (<p className="error">{error}</p>)}
                            <CustomTextField 
                                label="Email"
                                name="email" 
                                type="email"
                                placeholder="Enter your email"
                            />
                            <CustomTextField 
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            <Link to="/forgotpassword">
                               Forgot Password?
                           </Link>
                           <CustomButton  
                                class="login-btn"
                                name="Login" 
                                color="primary"
                                type="submit"
                           />
                           <CustomButton
                                class="google-login-btn"
                                name="Continue With Google"
                                color="secondary"
                                type="button"
                                onClick={handleGoogleSignIn}
                           />
                           <p className="registration-link">
                               Don't have an account? 
                               <span onClick={() => history.push('registration')}> Click Here</span>
                           </p>
                           
                        </Form>
                    ) 
                }               

            </Formik>
        </Fragment>
    )
}

export default LoginForm