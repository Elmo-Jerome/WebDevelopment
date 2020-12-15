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
                <form onSubmit={this.handleSubmit} className="signin-form">
                    <Button  
                        color="#D34836"
                        hoverColor="#e54634"
                        name="Google +" 
                        action={signInWithGoogle}
                        width="100" 
                        enabled={true}
                    />
                </form>  
            </div>
            )
    }
}

export default Login