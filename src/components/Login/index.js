import React, { Component } from 'react'
import './style.scss'
import Button from '../Forms/Button'
import { signInWithGoogle } from '../../firebase/utils' 

class Login extends Component {

    handleSubmit = async (e) => {
        e.preventDefault()
    }

    render () {
        return (
            <div className="signin">
                <div className="signin-text">
                    LOGIN
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Button action={signInWithGoogle} name="Sign in with Google" width="100" />
                </form>  
            </div>
            )
    }
}

export default Login