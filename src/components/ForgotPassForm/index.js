import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { auth } from '../../firebase/utils'
import './style.scss'


const useStyle = makeStyles({
    btn: {
        fontSize: '1.3rem',
        marginTop: "1rem",
    },
    textField: {
        marginTop: '1rem',
    }
})

const CustomButton = props => {
    const classes = useStyle()

    return (
        <Fragment>
            <Button
                className={classes.btn}
                variant="contained"
                type={props.type}
                color="primary"
                fullWidth
            >
                {props.name}
            </Button>
        </Fragment>
    )
}

const CustomTextField = ({label, ...props}) => {
    const [ field, meta ] = useField(props)

    return (
        <Fragment>
            <TextField 
                label="Email"
                {...field}
                {...props}              
                error={meta.touched && meta.error} 
                helperText={meta.touched ? meta.error : ""}

                inputProps={{ style: { fontSize: "1.6rem", }}}
                InputLabelProps={{ style: { fontSize: "1.6rem" }}}
                FormHelperTextProps={{ style: { fontSize: "1.1rem" } }}
                fullWidth
            />
        </Fragment>
    )
}

const ForgotPass = props => {
    const history = useHistory()
    return (
        <Fragment>
            <Formik
                initialValues= {{
                    email: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid Email')
                        .required('Required')
                })}
                onSubmit = {async (values) => {
                    const { email } = values
                    try {
                        await auth.sendPasswordResetEmail(email)
                        .then(()=>console.log('we got the package son'))
                        .catch(()=>console.log("som'n went wrong brother"))
                        .then(()=>history.goBack())
                    } catch (err) {
                        console.log(err)
                    }
                }} 
            >
                { props => (
                    <Form className="form-box">
                        <div className="forgot-password-text">Forgot Password</div>
                        <CustomTextField 
                            label="Email"
                            name="email"
                            type="email"
                        />
                        <CustomButton 
                            name="Send Password Verification"
                            type="submit"
                        />
                    </Form>
                )}
            </Formik>
        </Fragment>
    )
}

export default ForgotPass