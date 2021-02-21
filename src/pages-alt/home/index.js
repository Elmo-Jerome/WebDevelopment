import React, { Fragment } from 'react'
import Logo from './images/logo/LOGO-NAME-nav.png'
import './style.scss'

// Components
import NavigationBar from '../../components-alt/NavigationBar'
import Carousel from '../../components-alt/Carousel'

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


    return (
        <Fragment>
              <NavigationBar Logo={Logo} /> 
              <Carousel images={carouselImages} />
              {/* Content */}
              <Container className="container-fluid px-5 py-5 mx-auto">
                <div className="row justify-content-between px-3">
                    {/* Populate DB with products */}
                    <div className="block text-center"> <img className="image" src="images/products/AMD Ryzen 5 3600 Matisse 3.6GHz 6-Core AM4 Boxed Processor with Wraith Stealth Cooler.jpg"/>
                        <div className="info py-2 px-2">
                            <div className="row px-3">
                                <div className="cart">
                                    <p className="mb-0 sm-font">ADD TO BAG</p>
                                </div>
                                <div className="order">
                                    <p className="mb-0 sm-font">ORDER NOW</p>
                                </div>
                            </div>
                            <div className="text-left">
                                <h5 className="mb-0 mt-2">AMD Ryzen 5 3600 Matisse</h5> <small className="text-muted mb-1">3.6GHz 6-Core AM4 Processor </small>
                            </div>
                            <div className="row px-3">
                                <h5>₱3,599.00</h5>
                                <p className="text-muted ml-2"><del>₱4,599.00</del></p>
                            </div>
                        </div>
                    </div>
                </div>
               </Container>
        </Fragment>
    )
}