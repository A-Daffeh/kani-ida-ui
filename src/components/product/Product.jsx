import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import SearchBar from '../layouts/SearchBar';
import { useFetchProducts } from '../../services/ProductService';

const Product = () => {
    const { data: products, isLoading, error } = useFetchProducts({ page: 0, size: 10 });

    return (
        <>
            <Header pageTitle="Products" />
            <SearchBar />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product">
                    <Button variant="light product-btn">Add new Product</Button>{' '}
                </Link>
            </span>
            <table className="table">
                <thead>
                    <tr className="header-border">
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.content.map((product, index) => (
                        <tr key={product.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.availability ? 'Available' : 'Not Available'}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                            <td><button className="options-btn">...</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {products && products.pageable && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-custom">
                        <li className={`page-item ${products.pageable.pageNumber === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => useFetchProducts({ page: products.pageable.pageNumber - 1, size: 10 })} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {[...Array(products.pageable.totalPages)].map((_, pageIndex) => (
                            <li key={pageIndex} className={`page-item ${pageIndex === products.pageable.pageNumber ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => useFetchProducts({ page: pageIndex, size: 10 })}>
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${products.pageable.pageNumber === products.pageable.totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => useFetchProducts({ page: products.pageable.pageNumber + 1, size: 10 })} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Product;
