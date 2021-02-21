import React, { useEffect } from 'react'
import Carousel from '../../components/Carousel'
import { useFirestore } from '../../components/CustomHooks'
import './style.scss'

export default function Landing (props) {
    const { docs } = useFirestore('products')
    useEffect(() => {
        if(docs) {
            console.log(docs)
        }
    },[docs])
    return (
        <div className="content-landing">
            <Carousel />
        </div>
    )
}