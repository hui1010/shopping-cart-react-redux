import {useState} from 'react'

import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'

// feature-1
function App() {
  const [products, setProducts] = useState(data.products)
  const [productsCopy, setProductsCopy] = useState(data.products)
  const [size, setSize] = useState("")
  const [sort, setSort] = useState("")
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : [])

  const sortProducts = (event) => {
    const targetSort = event.target.value
    setSort(targetSort)
    setProducts(
      products.slice().sort((a, b) => 
        targetSort == "lowest" ? a.price - b.price : targetSort =="highest" ? b.price - a.price : b._id - a._id
      )
    )
  }
  const filterProducts = (event) => {
    const targetSize = event.target.value
    setSize(targetSize)
    if(targetSize) {
      setProducts(
        productsCopy.filter(product => product.availableSizes.indexOf(targetSize) >= 0)
      )
    } else {
      setProducts(productsCopy)
    }
  }
  const addToCart = (product) => {
    const items = cartItems.slice()
    let alreadyInCart = false
    items.forEach(item => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true
      }
    })
    if(!alreadyInCart) {
      items.push({...product, count: 1})
    }
    setCartItems(items)
    localStorage.setItem("cartItems", JSON.stringify(items))
  }
  const removeFromCart = (product) => {
    const items = cartItems.slice()
    setCartItems(items.filter(item => item._id !== product._id))
    localStorage.setItem("cartItems", JSON.stringify(items.filter(item => item._id !== product._id)))
  }

  const createOrder = (order) => {
    console.log("hi")
  }
  

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main" >
            <Filter 
              count={products.length} 
              size={size} 
              sort={sort}
              sortProducts={sortProducts}
              filterProducts={filterProducts}  
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} createOrder={createOrder}/>
          </div>
        </div>
      </main>
      <footer>
        All right is reserved.
      </footer>
    </div>
  );
}

export default App;
