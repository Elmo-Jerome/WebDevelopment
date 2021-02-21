import React, { useState, Fragment } from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
  } from 'reactstrap';

export default function CarouselComponent (props) {
    const { images } = props

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }

    return (
        <Fragment>
            <Carousel 
                style={{width: "100%", height: "auto"}}
                activeIndex={activeIndex}
                next={next}
                previous={previous}>
                    <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {images.map( (image, i) => (
                        <CarouselItem key={i} 
                            onExiting={() => setAnimating(true)}
                            onExited={() => setAnimating(false)}>
                                <img style={{width:"100%", height: "auto",}} src={image} />
                        </CarouselItem>

                    ))}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />

            </Carousel>
        </Fragment>
    )
}