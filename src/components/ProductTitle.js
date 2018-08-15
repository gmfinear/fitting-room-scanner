import React from 'react';

const ProductTitle = (props) => (
    <div>
        <h2 className="product-title">{props.productData.plainName}</h2>
        <h3 className="product-subtitle">{props.productData.brandName}</h3>
    </div>
);

export default ProductTitle;