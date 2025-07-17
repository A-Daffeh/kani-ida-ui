import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import SearchBar from '../layouts/SearchBar';
import { useFetchProducts } from '../../services/ProductService';

const Product = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const { data: products, isLoading, error } = useFetchProducts({ page: currentPage, size: 10 });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDropdownClick = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Header pageTitle="Products" />
            <SearchBar />
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product">
                    <Button variant="light product-btn">Add new Product</Button>{' '}
                </Link>
            </span>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {products && products.content && products.content.length > 0 ? (
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
                        {products.content.map((product, index) => (
                            <tr key={product.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.availability ? 'Available' : 'Not Available'}</td>
                                <td>{product.quantity}</td>
                                <td>{product.productCategory.name}</td>
                                <td style={{ position: 'relative' }}>
                                    <button className="options-btn" onClick={() => handleDropdownClick(index)}>...</button>
                                    {activeDropdown === index && (
                                        <div className="dropdown-menu show" ref={dropdownRef}>
                                            <Link to={`/view/product/${product.id}`} className="dropdown-item">
                                            View Product
                                            </Link>

                                            <Link to={`/update/product/${product.id}`} className="dropdown-item">
                                            Edit Product
                                            </Link>

                                            <button className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                Delete Product
                                                <input type="checkbox" id={`delete-${index}`} style={{ marginLeft: '10px' }} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available</p>
            )}
            {products && products.pageable && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-custom">
                        <li className={`page-item ${products.pageable.pageNumber === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(products.pageable.pageNumber - 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {[...Array(products.pageable.totalPages)].map((_, pageIndex) => (
                            <li key={pageIndex} className={`page-item ${pageIndex === products.pageable.pageNumber ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(pageIndex)}>
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${products.pageable.pageNumber === products.pageable.totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(products.pageable.pageNumber + 1)} aria-label="Next">
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

