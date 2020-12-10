import React from 'react'
import './style.scss'

const Directory = props => {

    const MensFashionPage = event => {
        console.log("men's fashion")
    }
    const WomensFashion = event => {
        console.log("women's fashion")
    }

    return (
        <div className="homepage-wrapper">
            <div className="men-fashion-directory" onClick={MensFashionPage}>
                <p className="fashion-text">Men's</p>                
            </div>
            <div className="women-fashion-directory" onClick={WomensFashion}>
                <p className="fashion-text">Women's</p>    
            </div>
        </div>
    )
}

export default Directory