import React, { useState } from 'react';
import Banner from "../components/banner/Banner";
import NavBar from "../components/navbar/NavBar";
import ProductCardListing from "../components/product/ProductCardListing";
import Footer from "../components/layouts/Footer";
import { useFetchProducts } from '../services/ProductService';

const SavorySeasoning = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 10;

    // Fetch products using the useFetchProducts hook
    const { data: productsData, isLoading, error } = useFetchProducts({ page: currentPage, size: productsPerPage });

    // Extract products from the response
    const products = productsData?.content || [];
    const totalPages = productsData?.totalPages || 0;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <NavBar />
            <Banner banner_title="Savory & Seasoning" className="savory-banner" />
            <div className="container-fluid">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!isLoading && !error && products.length > 0 && (
                    <>
                        <ProductCardListing products={products} />
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mt-4">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
                {!isLoading && !error && products.length === 0 && (
                    <p>No products available</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SavorySeasoning;
