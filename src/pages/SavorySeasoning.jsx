import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from "../components/banner/Banner";
import NavBar from "../components/navbar/NavBar";
import ProductCardListing from "../components/product/ProductCardListing";
import Footer from "../components/layouts/Footer";

const products = [];

const SavorySeasoning = () => {
    
    return (
        <>
            <NavBar />
            <Banner banner_title="Savory & Seasoning" className="savory-banner" />
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
};

export default SavorySeasoning;
