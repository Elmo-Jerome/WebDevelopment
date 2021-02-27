import React, { Fragment, useEffect } from 'react'

import { Container } from 'reactstrap'
import Item from '../../components-alt/Item'
import './style.scss'

///// REDUX /////
import { useFirestore } from '../../components/CustomHooks'

export default function Products (props) {
    const { docs } = useFirestore('products')
    
    useEffect( () => {

    },[])
    return (
        <Fragment>
            <div className="products mt-4 container-fluid mx-auto">
                <div className="row justify-content-between px-3">
                    {docs && docs.map((product, i) => (
                       <Item key={i} product={product} />
                    ))}
                </div>
            </div>
        </Fragment>
    )
}