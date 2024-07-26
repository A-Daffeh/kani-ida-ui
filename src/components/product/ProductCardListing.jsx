import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { fetchProducts } from '../store/actions/ProductActions';
import './ProductCardListing.css';

const ProductCardListing = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 10 }));
    }, [dispatch]);

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
