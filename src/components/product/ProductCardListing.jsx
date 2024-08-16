import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductCardListing.css';

const ProductCardListing = () => {
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-card-listing m-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    image={product.image}
                    category={product.category}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
};

export default ProductCardListing;
