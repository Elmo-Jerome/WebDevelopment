import React, { useState, useEffect } from 'react'
import './style.scss'

const Button = props => {
    const [ hovered, setHovered ] = useState(false)
    const [ background, setBackground ] = useState("")
    const defaultUnhovered = "#313131"
    const defaultHovered = "#6b6b6b"

    useEffect(() => {
        console.log(hovered)
        // Pag may color na binigay sa Button need din may hoverColor
        if (props.color && props.hoverColor) {
            if ( hovered && background !== props.hoverColor ) {
                setBackground(props.hoverColor)
            } else if ( hovered === false && background !== props.color ) {
                setBackground(props.color)
            }
        } else {
            if (hovered && background !== defaultHovered) {
                setBackground(defaultHovered)
                console.log("hovered background")
            } else {
                setBackground(defaultUnhovered)
            }
        }
    }, [hovered])

    return (
        <div
            onClick={props.action}
            className="button" 
            onMouseOver={()=>{setHovered(true)}} 
            onMouseOut={()=>{setHovered(false)}}
            style={{ 
                width: props.width ? `${props.width}%` : "auto",
                background: background,
                color: props.textColor ? props.textColor: "white"
            }}>
                { props.name }
           
        </div>
    )
}

export default Button