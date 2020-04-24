import React from 'react';

const ProductSort = ({length,handleChange,sort}) => {

    return (
        <div className="product__sort">
            <p className="product__sort-amount">{length} Product(s) found</p>
            <div className="product__sort-box">
                <p className="product__sort-title">Order by</p>
                <select
                    value={sort}
                    onChange={handleChange}
                >
                    <option value="1"> Select</option>
                    <option value="2"> Hightest to lowest</option>
                    <option value="3"> Lowest to hightest</option>
                </select>
            </div>

        </div>
    );
}

export default ProductSort;
