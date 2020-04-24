import React from 'react';

const active={
    color:'white',
    backgroundColor:'black'
}
const ProductSize = ({item,changStatus}) => {

    return (

        <input type="button" value={item.name} style={item.status ? active:{}} onClick={changStatus} />

    );
}

export default ProductSize;
