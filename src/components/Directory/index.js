import React from 'react'
import { Link } from 'react-router-dom'
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
            <div className="men-wrapper"> 
                <Link to="/men"> 
                    <div className="men-fashion-directory" onClick={MensFashionPage}>
                        <p className="fashion-text">Men's</p>                
                    </div>
                </Link>  
            </div>
            <div className="women-wrapper">
                <Link to="/women">
                    <div className="women-fashion-directory" onClick={WomensFashion}>
                        <p className="fashion-text">Women's</p>    
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Directory