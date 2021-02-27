import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

///// UI /////
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import './style.scss'

///// REDUX /////
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/Actions'
const mapState = ({product, user}) => ({
    selectedProduct: product.selectedProduct,
    currentUser: user.currentUser,
})

///// MUI STYLES ///// 
const useStyle = makeStyles({
    btn: {
        marginLeft: '1rem',
    },
})


export default function ProductShowcase (props) {
    const { selectedProduct, currentUser } = useSelector(mapState)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyle()

    useEffect( () => {
        if (!selectedProduct) {
            history.push('products')
        } else {
            console.table(selectedProduct)
        }
        window.scrollTo(0,0)
    },[])

    const handleAddToCart = async () => {
        if (currentUser) {
            const {
                createdAt, name, availability, description, image, price, id,
            } = selectedProduct
            // update redux cart on firebase
            await dispatch(addToCart({
                createdAt, name, availability, description, image, price, itemID:id, quantity,
            },currentUser))
            // redirect to cart 
            history.push('cart')            
        } else {
            // redirect to log in 
            await alert('Must be logged in to buy')
            history.push('login')
        }
    }

    const handleOrderNow = async () => {
        if (currentUser) {
            const {
                createdAt, name, availability, description, image, price, id,
            } = selectedProduct
            // Add item to cart 
            await dispatch(addToCart({
                createdAt, name, availability, description, image, price, itemID:id, quantity,
            },currentUser))
            // redirect to checkout
            history.push('checkout')
        } else {
            // redirect to login 
            await alert('Must be logged in to buy') 
            history.push('login')
        }
    }



    const addQuantity = () => {
        if (quantity <= selectedProduct.availability) {
            setQuantity(quantity + 1)
        }
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div>
           {selectedProduct && (
            <div className="showcase-wrapper container-fluid">
                    <div className="showcase row">
                        <div className="col-md-5">
                            <img src={selectedProduct.image} alt="" />
                        </div>
                        <div className="col-md-7">
                            <h2>{ selectedProduct.name }</h2>
                            <p>Product code: { selectedProduct.id }</p>
                            <h3 className="price">₱{ selectedProduct.price.toFixed(2) }</h3>
                            {selectedProduct.undiscountedPrice && <p className="text-muted ml-2"><del>₱{ selectedProduct.undiscountedPrice.toFixed(2) }</del></p>}
                            <p><b>Specifications:</b></p>
                            <p>{ selectedProduct.description }</p>
                            <p><b>Availability:</b> { selectedProduct.availability > 0 ? `In Stock (${ selectedProduct.availability } available)` : `Out of Stock` }</p>
                            <label>Quantity:</label>
                            <div className="quantity container mt-3">
                                <div className="col-sm-4"></div>
                                <div className="col-sm-4 col-sm-offset-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <Button 
                                                onClick={addQuantity}
                                                disabled={quantity === selectedProduct.availability || selectedProduct.availability === 0} 
                                                id="plus-btn">
                                                    <i className="fa fa-plus"></i></Button>
                                        </div>                                       
                                        <input 
                                            style={{ textAlign: "center", width: '1rem', }}
                                            type="number" 
                                            className="form-control form-control-sm" 
                                            value={ selectedProduct.availability === 0 ? 0 : quantity } 
                                            min="0"
                                            readonly  />
                                        <div className="input-group-prepend">
                                            <Button
                                                onClick={decreaseQuantity} 
                                                disabled={quantity === 1}
                                                id="minus-btn">
                                                    <i className="fa fa-minus"></i></Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4"></div>
                        </div>
                        <Button                                
                            style={{marginRight: '1rem'}}
                            onClick={handleAddToCart} 
                            disabled={selectedProduct.availability === 0} 
                            type="button" 
                            variant="contained" 
                            color="primary" 
                            className="">
                                Add to Cart</Button>
                        <Button    
                            // style={{marginLeft}}                         
                            className={classes.btn}
                            onClick={handleOrderNow}
                            disabled={selectedProduct.availability === 0} 
                            type="button" 
                            variant="contained" 
                            color="primary" 
                            className="">
                                Buy</Button>
                        </div>
                    </div>
                    {/* <div className="showcase row">

                        <div className="picture-zone col-6-md">
                            <img src={selectedProduct.image} />
                        </div>


                        <div classNameName="description-zone col-md">
                            <h1>{ selectedProduct.name }</h1>
                            <h2>{ selectedProduct.description }</h2>
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    )
}