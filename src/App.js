import {useState} from 'react'

import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter'

// feature-1
function App() {
  const [products, setProducts] = useState(data.products)
  const [size, setSize] = useState("")
  const [sort, setSort] = useState("")

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
        products.filter(product => product.availableSizes.indexOf(targetSize) >= 0)
      )
    } 
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
            <Products products={products}/>
          </div>
          <div className="sidebar">
            Cart Items
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
