import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import './style.scss'

///// REDUX /////
import { useDispatch, useSelector } from 'react-redux'
import { EmailResetPassword } from '../../redux/Actions'
const mapState = ({ user }) =>({
    passwordResetEmailSent : user.passwordResetEmailSent,
})


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
    const { passwordResetEmailSent } = useSelector(mapState)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        if (passwordResetEmailSent) {
            // alert('Password Reset Sent! Please check your email')
            history.push('/password-reset-sent')
        }
    }, [passwordResetEmailSent])
    useEffect(() => {
        if(error) {
            console.log(error)
        }
    },[error])
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
                onSubmit = {async (values, {resetForm}) => {
                    const { email } = values
                    try {
                        await dispatch(EmailResetPassword({ email }))
                        resetForm()
                    } catch (err) {
                        setError(err)
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