import React, { useEffect, useState } from 'react'
import { useFirestore } from '../../components/CustomHooks'
import { useHistory } from 'react-router-dom'

///// UI /////
import { Button } from '@material-ui/core'

///// FIREBASE /////
import { firestore } from '../../firebase/utils'

export const ProductList = ({product, handleDelete}) => {
    const [quantity, setQuantity] = useState(product.quantity)

    const addQuantity = () => {
        if (quantity <= product.availability) {
            setQuantity(quantity + 1)
        }
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <tr>
            <td><img src={product.image} className="cartimg"/> </td>
            <td>{ product.name }</td>  
            <td>{ product.availability > 0 ? `In Stock (${ product.availability } available)` : 'Out of Stock'}</td>
            {/* <td><input className="form-control" type="number" value={quantity} /></td> */}
            <div className="input-group mt-4">
                {/* <div className="input-group-prepend">
                    <Button 
                        onClick={addQuantity}
                        disabled={quantity === product.availability || product.availability === 0} 
                        id="plus-btn">
                            <i className="fa fa-plus"></i></Button>
                </div>                                        */}
                <input 
                    style={{ textAlign: "center", }}
                    type="number" 
                    id="qty_input" 
                    className="form-control form-control-sm" 
                    value={product.availability === 0 ? 0 : quantity} 
                    min="0"
                    readOnly />
                {/* <div className="input-group-prepend">
                    <Button 
                        onClick={decreaseQuantity} 
                        disabled={quantity === 1}
                        id="minus-btn">
                            <i className="fa fa-minus"></i></Button>
                </div> */}
            </div>
            <td className="text-right">₱{ product.price.toFixed(2) }</td>
            <td className="text-right"><button onClick={ () => handleDelete(product.id) } className="btn btn-sm btn-danger"><i className="fa fa-trash"></i> </button> </td>
        </tr>
    )
}

export default function CartUI ( {user} ) {
    const { docs } = useFirestore(`users/${user.id}/cart`)
    const [totalPrice, setTotalPrice] = useState(0)
    const [subTotalPrice, setSubTotalPrice] = useState(0)
    const [shippingFee, setShippingFee] = useState(120)
    const history = useHistory()
    // Calculate Prices
    useEffect( () => {
       if (docs) {
           let productPrice = 0

           docs.forEach((product,i) => {
                productPrice += (product.price * product.quantity)
           })

           setSubTotalPrice(productPrice)
           setTotalPrice(shippingFee + subTotalPrice)
       }
    },[docs, subTotalPrice, shippingFee])

    useEffect( () => {
        if (docs.length === 0) {
            setShippingFee(0)
        } else {
            setShippingFee(120)
        }
    },[docs])
    // Reset scroll 
    useEffect ( () => {
        window.scrollTo(0,0)
    },[])

    const handleDelete = async (productID) => {
        // docRef
        console.log(user.id)
        const docRef = firestore.doc(`users/${user.id}/cart/${productID}`)
        // firestore.collection('users').doc(user.id).collection('cart').doc(productID).get().then(doc => console.log(doc.id))
        await docRef.delete()   
    }



    return (
            <div style={{margin: "5rem auto 0", maxWidth: "90%" }}>
                <div className="mb-4">
                <div className="divtxt">
                    <h1>My Cart</h1>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Availability</th>
                                        <th scope="col" className="text-center">Quantity</th>
                                        <th scope="col" className="text-right">Price (per unit)</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {docs.map( (product, i) => (
                                       <ProductList handleDelete={handleDelete} key={i} product={product} />
                                   ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Sub-Total</td>
                                        <td className="text-right">₱{subTotalPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Shipping</td>
                                        <td className="text-right">₱{shippingFee.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total</strong></td>
                                        <td className="text-right"><strong>₱{totalPrice.toFixed(2)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col mb-2">
                        <div className="row">
                            <div className="col-sm-12  col-md-6">
                                <Button 
                                    onClick={() => history.push('products') }
                                    variant="contained" 
                                    color="primary" 
                                    className="" 
                                    id="contshop" >
                                        Continue Shopping</Button>
                            </div>
                            <div className="col-sm-12 col-md-6 text-right">
                                <Button 
                                    onClick={() => history.push('checkout') }
                                    variant="contained" 
                                    color="primary" 
                                    className=" checkout" 
                                    id="chckout">
                                        Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}