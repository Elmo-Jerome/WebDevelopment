import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

///// REDUX /////
import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedProduct, selectProduct, addToCart } from '../../redux/Actions'
const mapState = ({user, product}) => ({
    currentUser: user.currentUser,
    selectedProduct: product.selectedProduct
})  

export default function Item (props) {
    const { currentUser, selectedProduct } = useSelector(mapState)
    const dispatch = useDispatch()
    const history = useHistory()
    const { product } = props
    const { 
        createdAt, name, availability, description, image, price, id
    } = product

    const handleAddToCart = async () => {
        if (currentUser) {
            // update redux cart on firebase
            await dispatch(addToCart({
                createdAt, name, availability, description, image, price, itemID:id, quantity: 1,
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
            // Add item to cart 
            await dispatch(addToCart({
                createdAt, name, availability, description, image, price, itemID:id, quantity: 1,
            },currentUser))
            // redirect to checkout
            history.push('checkout')
        } else {
            // redirect to login 
            await alert('Must be logged in to buy') 
            history.push('login')
        }
    }

    const SelectShowcase = async () => {
        await dispatch(selectProduct(product))
        history.push('product-showcase')
    }  

    useEffect ( () => {
        dispatch(clearSelectedProduct())
    },[])

    return (
        <div className="items block text-center mx-3"> 
            <img onClick={SelectShowcase} className="image" src={product.image}/>
            <div className="info py-2 px-2">
                <div className="row px-3">
                    <div onClick={handleAddToCart} className="cart">
                        <p className="mb-0 sm-font">ADD TO CART</p>
                    </div>
                    <div onClick={handleOrderNow} className="order">
                        <p className="mb-0 sm-font">ORDER NOW</p>
                    </div>
                </div>
                <div className="text-left">
                    <h5 className="mb-0 mt-2">{ product.name }</h5> <small className="text-muted mb-1">{ product.description }</small>
                </div>
                <div className="row px-3">
                    <h5>₱{product.price.toFixed(2)}</h5>
                    {product.undiscountedPrice && (<p className="text-muted ml-2"><del>₱{product.undiscountedPrice.toFixed(2)}</del></p>)}
                </div>
            </div>
        </div>
    )
}