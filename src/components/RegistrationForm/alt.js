import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import './alt.scss'
///// REDUX /////
import { useSelector, useDispatch } from 'react-redux'
import { CreateUser } from '../../redux/Actions'
const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess,
})


// Custom Fields & css on js
const useStyle = makeStyles({
    margins: {
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
    },
    btn: {
        fontSize: '1.3rem',
    }
})

const CustomTextField = ({label, ...props}) => {
    const [ field, meta ] = useField(props)
    const classes = useStyle()
    return (
        <Fragment>
            <TextField 
                className={classes.margins}
                label={label}
                {...field}
                {...props}
                // Error Checking 
                error={ meta.touched && meta.error}
                helperText={meta.touched ? meta.error : ""}
                // Customization
                inputProps={{ style: { fontSize: "1.6rem", }}}
                InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                FormHelperTextProps={{ style: { fontSize: "1.1rem" } }}
                fullWidth
            />
        </Fragment>
    )
}

const CustomButton = props => {
    const classes = useStyle()
    return (
        <Fragment>
            <Button
                className={`${classes.margins} ${classes.btn}`}
                variant="contained"
                type={props.type}
                color={props.color}
                fullWidth
                onClick={props.OnClick}
            >
                { props.name}
            </Button>
        </Fragment>
    )
}

// Exported Form
const RegistrationForm = props => {
    const { signInSuccess } = useSelector(mapState)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChange = async (values) => {
        const { email, password, displayName } = values
        await dispatch(CreateUser({email, password, displayName}))
    }
    // Redirect user To Homepage after successful Sign in
    useEffect(()=>{
        if(signInSuccess) {
            history.push('/')
        }
    }, [signInSuccess])

    return (
        <Fragment>
            <Formik
                initialValues={{
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPasword: '',
                }}
                validationSchema={Yup.object({
                    displayName: Yup.string()
                        .min(8, 'Minimum of 8 characters')
                        .max(20, 'Maximum of 20 characters')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email')
                        .required('Required'),
                    password: Yup.string()
                        .min(6, 'Minimum of 6 characters')
                        .max(60, 'Maximum of 60 characters')
                        .required('Required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], "Passwords don't match")
                        .required('Required'),
                })}
                onSubmit={async(values, { resetForm })=>{
                    await handleChange(values)
                    resetForm()
                }}
            >

                {
                    props => (
                        <Form className="registration-form">
                            <h1>Create an Account</h1>
                            {/* Custom TextFields */}
                            <CustomTextField 
                                name="displayName"
                                label="Username"
                                type="text"
                            />
                            <CustomTextField 
                                name="email"
                                label="Email"
                                type="email"
                            />
                            <CustomTextField 
                                name="password"
                                label="Password"
                                type="password"
                            />
                            <CustomTextField 
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                            />
                            <CustomButton 
                                name="Sign up"
                                type="submit"
                                color="primary"
                            />
                        </Form>
                    )
                }

            </Formik>
        </Fragment>
    )
}

export default RegistrationForm
