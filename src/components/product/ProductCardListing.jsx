import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductCardListing.css';

const ProductCardListing = ({ products }) => {
    return (
        <div className="product-card-listing m-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    image={product.imageUrl}
                    category={product.productCategory.name}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
};

export default ProductCardListing;
