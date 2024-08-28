import React from 'react';
import ProductCard from './ProductCard';
import './ProductCardListing.css';
import { useSelector } from 'react-redux';

const ProductCardListing = ({ products }) => {
    const userId = useSelector((state) => state.auth.user?.data.authResponse.user.id);

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
                    productId={product.id}
                    userId={userId}
                />
            ))}
        </div>
    );
};

export default ProductCardListing;
