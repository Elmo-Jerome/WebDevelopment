import React from 'react'
import './style.scss'

const Directory = props => {

    const clickHandler = event => {
        console.log("clicked")
    }

    return (
        <div className="homepage-wrapper">
            <div className="men-fashion-directory" onClick={clickHandler}/>
            <div className="women-fashion-directory"/>
        </div>
    )
}

export default Directory