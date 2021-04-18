import React from 'react'

function Filter({count, size, sort, sortProducts, filterProducts}) {

    return (
        <div className="filter"> 
            <div className="filter-re">
                {count} products
            </div>
            <div className="filter-sort">
                Order By {" "}
                <select value={sort} onChange={sortProducts}>
                    <option value="">Latest</option>
                    <option value="lowest">Lowest price</option>
                    <option value="highest">Highest price</option>
                </select>
            </div>
            <div className="filter-size">
                Filter Size {" "}
                <select value={size} onChange={filterProducts}>
                    <option value="">ALL</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
