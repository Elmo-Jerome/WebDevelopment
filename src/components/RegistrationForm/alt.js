import React, { Fragment } from 'react'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { auth, handleProfile } from '../../firebase/utils'
import './alt.scss'

const useStyle = makeStyles({
    textField: {
         marginBottom: "1rem"
    },
    btn: {
        marginTop: "1rem", 
        fontSize: "1.3rem"
    },
})

const CustomTextField = ({label, ...props}) => {
    const classes = useStyle()
    const [ field, meta ] = useField(props)
    return (
        <Fragment>
            <TextField 
                className={classes.textField}
                label={label}
                {...field}
                {...props}
                error={meta.touched && meta.error}
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
                className={classes.btn}
                variant="contained"
                type={props.type}
                color={props.color}
                fullWidth
            >
                { props.name }
            </Button>
        </Fragment>
    )
}


const RegistrationForm = props => {
    const handleSubmit = async (values) => {
        const { displayName, password, email } = values
       try{ 
           const { user } = await auth.createUserWithEmailAndPassword(email, password)
           await handleProfile(user, { displayName })
        }
       catch (err) { console.log(err) }
    }
    return(
        <Fragment>
            <Formik
                initialValues={{
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object({
                    displayName: Yup.string()
                        .min(8, "Minimum of 8 characters")
                        .max(20, "Maximum of 20 characters")
                        .required('Required'),
                    email: Yup.string()
                        .email("Invalid email")
                        .required('Required'),
                    password: Yup.string()
                        .min(8, "Minimum of 8 characers")
                        .max(60, "Maximum of 60 characters")
                        .required('Required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords don't match")
                        .required('Required'),
                })}
                onSubmit={async (values, {resetForm})=>{
                    await handleSubmit(values)
                    resetForm()
                }}
            >
                {
                    props => (
                        <Form className="registration-form">
                            <CustomTextField 
                                type="text"
                                name="displayName"
                                label="Username"
                            />
                            <CustomTextField 
                                type="email"
                                name="email"
                                label="Email"
                            />
                            <CustomTextField 
                                type="password"
                                name="password"
                                label="Password"
                            />
                            <CustomTextField 
                                type="password"
                                name="confirmPassword"
                                label="Confirm Password"
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