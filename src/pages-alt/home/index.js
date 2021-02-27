import React, { Fragment, useEffect } from 'react'
import './style.scss'

import { useFirestore } from '../../components/CustomHooks'

// Components
import NavigationBar from '../../components-alt/NavigationBar'
import Carousel from '../../components-alt/Carousel'
import Item from '../../components-alt/Item'

import {
    Container
} from 'reactstrap'

import Carousel_Img_1 from './images/carousel/img1.jpg'
import Carousel_Img_2 from './images/carousel/img2.jpg'
import Carousel_Img_3 from './images/carousel/img3.jpg'
import Carousel_Img_4 from './images/carousel/img4.jpg'
import Carousel_Img_5 from './images/carousel/img5.jpg'

const carouselImages = [
    Carousel_Img_1,
    Carousel_Img_2,
    Carousel_Img_3,
    Carousel_Img_4,
    Carousel_Img_5,
];


export default function Home (props) {
    const { docs } = useFirestore('products')

    useEffect( () => {
        if(docs) 
            console.log(docs)
    },[docs])


    return (
        <Fragment>
              <Carousel images={carouselImages} />
              {/* Content */}
              <div className="products mt-4 container-fluid mx-auto">
                <div className="row justify-content-between px-3">
                    {/* Populate DB with products */}
                    {docs && docs.map((product, i) => (
                      <Item key={i} product={product} />
                    ))}
                </div>
               </div>
        </Fragment>
    )
}