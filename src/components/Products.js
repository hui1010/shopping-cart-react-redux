import React, {useState} from 'react'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

import formatCurrency from '../Util'

const Products = ({products, addToCart}) => {

    const [product, setProduct] = useState(null)

    const openModal = (product) => {
        setProduct(product)
    }

    const closeModal = () => {
        setProduct(null)
    }

    return (
        <div>
            <Fade bottom cascade> 
                <ul className="products">
                    {products.map(product => (
                    <li key={product._id} >
                        <div className="product">
                            <a href={"#" + product._id} onClick={()=> openModal(product)} >
                                <img src={product.image} alt={product.title} /> 
                                <p>{product.title}</p>
                            </a>
                            <div className="product-price">
                                <div>
                                    {formatCurrency(product.price)}
                                </div>
                                <button className="button primary" onClick={() => addToCart(product)}>Add to cart</button>
                            </div>
                        </div>    
                    </li>
                    ))}
                </ul>
            </Fade>
            {product && (
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title}></img>
                            <div className="product-details-description">
                                <p>
                                    <strong>{product.title}</strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Available Sizes: {" "}
                                    {
                                        product.availableSizes.map(size => (
                                            <span>
                                                {" "}
                                                <button className="button">{size}</button>
                                            </span>
                                        ))
                                    }
                                </p>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary" onClick={()=> {addToCart(product);closeModal()}}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )}
        </div>
    )
}

export default Products
