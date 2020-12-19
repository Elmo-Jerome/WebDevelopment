import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Formik, useField, Form } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"
import { auth, signInWithGoogle } from '../../firebase/utils'
import './style.scss'

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
                inputProps={{ style: { fontSize: "1.6rem", }}}
                InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                FormHelperTextProps={{ style: { fontSize: "1.1rem" } }}
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
                className={classes.margins}
                variant="contained"
                type={props.type}
                onClick={props.onClick}
                fullWidth
                style= {{ marginTop: "1rem", fontSize: "1.3rem"}}
                color={props.color}
            >
                {props.name}
            </Button>
        </Fragment>
    )
}

const LoginForm = props => {
    const handleSubmit = async (values) => {
        const { email, password } = values
        await auth.signInWithEmailAndPassword(email, password)
    }
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
                            <CustomTextField 
                                label="Email"
                                name="email" 
                                type="email"
                            />
                            <CustomTextField 
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <Link to="/forgotpassword">
                               Forgot Password?
                           </Link>
                           <CustomButton  
                                name="Login" 
                                color="primary"
                                type="submit"
                           />
                           <CustomButton
                                name="Continue With Google"
                                color="secondary"
                                type="button"
                                onClick={signInWithGoogle}
                           />
                           
                        </Form>
                    ) 
                }               

            </Formik>
        </Fragment>
    )
}

export default LoginForm