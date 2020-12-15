import React, { useState, useEffect } from 'react'
import './style.scss'

const Button = props => {
    const [ hovered, setHovered ] = useState(false)
    const [ background, setBackground ] = useState("")
    const defaultUnhovered = "#141414"
    const defaultHovered = "#3f3f3f"
    const defaultDisabled = "#bfbfbf"

    useEffect(() => {
        // Pag may color na binigay sa Button need din may hoverColor din
        if (props.color && props.hoverColor && props.enabled) {
            if ( hovered && background !== props.hoverColor ) {
                setBackground(props.hoverColor)
            } else if ( hovered === false && background !== props.color ) {
                setBackground(props.color)
            }
        } else {
            if (hovered && background !== defaultHovered && props.enabled) {
                setBackground(defaultHovered)
            } else {
                setBackground(defaultUnhovered)
            }
        }
    }, [hovered, props.enabled])

    return (
        <div
            onClick={props.action}
            className="button" 
            onMouseOver={()=>{setHovered(true)}} 
            onMouseOut={()=>{setHovered(false)}}
            style={{ 
                width: props.width ? `${props.width}%` : "auto",
                background: props.enabled ? background : defaultDisabled,
                color: props.textColor ? props.textColor: "white",
                pointerEvents: props.enabled ? `all`: `none`,
            }}>
                { props.name }
           
        </div>
    )
}

export default Button