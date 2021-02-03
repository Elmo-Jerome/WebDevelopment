import React, { useState } from 'react' 
import './style.scss'

export default function Carousel (props) {
    const [item, setItem] = useState(1)

    return (
        <div className="carousel">
            {item === 0 && (
                <div></div>
            )}
        </div>
    )
}