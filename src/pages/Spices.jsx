import React, { useEffect } from 'react';
import Banner from "../components/banner/Banner";
import { fetchProducts } from '../components/store/actions/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from "../components/navbar/NavBar";
import ProductCardListing from "../components/product/ProductCardListing";
import Footer from "../components/layouts/Footer";

const Spices = () => {
    
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 10 }));
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Banner banner_title="Spices" className="spices-banner" />
            <div className="container-fluid">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && products.length > 0 && (
                    <ProductCardListing products={products} />
                )}
                {!loading && !error && products.length === 0 && (
                    <p>No products available</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Spices;