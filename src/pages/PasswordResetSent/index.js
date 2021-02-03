import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './style.scss'

export default function Sent (props) {
    const history = useHistory()
    return (
        <div className="message">
            <p>Password Verification Sent! Please Check Your Email &nbsp;</p>
            <Button 
                onClick={()=>history.push('/login')}
                color="primary" 
                variant="contained" >
                Back to Login</Button>
        </div>
    )
}