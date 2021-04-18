import React, {useState} from 'react'

import formatCurrency from '../Util'

const Cart = ({cartItems, removeFromCart, createOrder}) => {

    const [showCheckout, setShowCheckout] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const order = {
            name, email, address, cartItems
        }
        createOrder(order)
    }

    const handleInput = (e) => {
        switch(e.target.name) {
            case 'email': setEmail(e.target.value)
            case 'name': setName(e.target.value)
            case 'address': setAddress(e.target.value)
            default: return
        }
    }
     
    return (
        <div>
            {cartItems.length === 0 ?    
                <div className="cart cart-header">Cart is empty.</div>
                :
                <div className="cart cart-header">You have {cartItems.length} products in the cart.</div>
            }
            <div>
                <div className="cart">
                    <ul className="cart-items">
                        {
                            cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count} {" "} {" "}
                                            <button className="button" onClick={() => removeFromCart(item)}>Remove</button>
                                        </div>   
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                    Total: {" "}
                                {formatCurrency(
                                    cartItems.reduce((a,c) => a + c.price*c.count, 0) //default value is 0
                                )}
                            </div>
                            <button onClick={()=>setShowCheckout(true)} className="button primary">Proceed</button>
                        </div>
                    </div>
                    {showCheckout && (
                        <div className="cart">
                            <form onSubmit={handleSubmit}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input name="email" type="email" value={email} required onChange={handleInput}/>
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input name="name" type="text" value={name} required onChange={handleInput}/>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input name="address" type="text" value={address} required onChange={handleInput}/>
                                    </li>
                                    <li>
                                        <button className="button primary" type="submit">Checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    )}
                </div>
                )}
                
            </div>  
        </div>
        
    )
}

export default Cart
