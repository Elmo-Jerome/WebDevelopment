import React, { useState, useEffect } from 'react'
import { useFirestore } from '../../components/CustomHooks'


export default function CheckoutUI ({user}) {
    const { docs } = useFirestore(`users/${user.id}/cart`)
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingFee, setShippingFee] = useState(120)

    useEffect( () => {
        if(docs) {
            let price = 0
            docs.forEach( (product,i) => {
                price += product.price
            })
            setTotalPrice(price + shippingFee)
        }
    },[docs,shippingFee,totalPrice])

    useEffect ( () => {
        window.scrollTo(0,0)
    },[])
    return (
            <div className="checkout">
            
                <div className="row chkout-form">
                        <div className="col order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Checkout</span>
                                <span className="badge badge-secondary badge-pill">{docs.length}</span>
                            </h4>
                                <ul className="list-group mb-3">
                                  {docs.map( (product) => (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{ product.name }</h6>
                                                <small className="text-muted">Brief description</small>
                                            </div>
                                            <span className="text-muted">₱{ (product.price * product.quantity).toFixed(2) }</span>
                                        </li>
                                  ))}
                                   
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Shipping:</span>
                                        <strong>₱{ shippingFee.toFixed(2) }</strong>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total:</span>
                                        <strong>₱{ totalPrice.toFixed(2) }</strong>
                                    </li>
                                </ul>

                            </div>
                            
                        {/* <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <form className="needs-validation" novalidate>
                            <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label for="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
        
                                <div className="mb-3">
                                <label for="email">Email </label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>
        
                                <div className="mb-3">
                                    <label for="address">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label for="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
                                </div>

                                <div className="row">   
                                    <div className="col-md-5 mb-3">
                                        <label for="country">City</label>
                                        <select className="custom-select d-block w-100" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>Pasig</option>
                                        <option>Quezon</option>
                                        <option>Manila</option>
                                        </select>
                                        <div className="invalid-feedback">
                                        Please select a valid city.
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label for="zip">Barangay</label>
                                        <input type="text" className="form-control" id="zip" placeholder="Barangay" required/>
                                        <div className="invalid-feedback">
                                        Barangay is required
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label for="zip">Zip</label>
                                        <input type="text" className="form-control" id="zip" placeholder="" required/>
                                        <div className="invalid-feedback">
                                        Zip code required.
                                        </div>
                                    </div>
                                </div>

                                <hr className="mb-4"/>
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="same-address"/>
                                    <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="save-info"/>
                                    <label className="custom-control-label" for="save-info">Save this information for next time</label>
                                    </div>
                                <hr className="mb-4"/>

                                <h4 className="mb-3">Payment</h4>

                                <div className="d-block my-3">
                                    <div className="custom-control custom-radio">
                                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required/>
                                        <label className="custom-control-label" for="credit">Credit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required/>
                                        <label className="custom-control-label" for="debit">Debit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required/>
                                        <label className="custom-control-label" for="paypal">Paypal</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label for="cc-name">Name on card</label>
                                        <input type="text" className="form-control" id="cc-name" placeholder="" required/>
                                        <small className="text-muted">Full name as displayed on card</small>
                                        <div className="invalid-feedback">
                                        Name on card is required
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label for="cc-number">Credit card number</label>
                                        <input type="text" className="form-control" id="cc-number" placeholder="" required/>
                                        <div className="invalid-feedback">
                                        Credit card number is required
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label for="cc-expiration">Expiration</label>
                                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required/>
                                        <div className="invalid-feedback">
                                        Expiration date required
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label for="cc-expiration">CVV</label>
                                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required/>
                                        <div className="invalid-feedback">
                                        Security code required
                                        </div>
                                    </div>
                                </div>
                                <hr className="mb-4"/>
                                <button className="btn btn-success btn-lg btn-block" type="submit">Continue to checkout</button>
                            </form> 
                            </div> */}
                        </div>

                </div>
    )
}