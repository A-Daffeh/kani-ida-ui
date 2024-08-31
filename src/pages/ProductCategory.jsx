import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import SearchBar from '../components/layouts/SearchBar';
import { useFetchCategories } from '../services/ProductCategoryService';

const ProductCategory = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const { data: categories, isLoading, error } = useFetchCategories({ page: currentPage, size: 10 });

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
            <Header pageTitle="Product Categories" />
            <SearchBar />
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product/category">
                    <Button variant="light product-btn">Add Product Category</Button>{' '}
                </Link>
            </span>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {categories && categories.content && categories.content.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr className="header-border">
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.content.map((category, index) => (
                            <tr key={category.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td style={{ position: 'relative' }}>
                                    <button className="options-btn" onClick={() => handleDropdownClick(index)}>...</button>
                                    {activeDropdown === index && (
                                        <div className="dropdown-menu show" ref={dropdownRef}>
                                            <Link to={`/view/product/category/${category.id}`} className="dropdown-item">
                                            View Category
                                            </Link>

                                            <button className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                Delete Category
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
                <p>No categories available</p>
            )}
            {categories && categories.pageable && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-custom">
                        <li className={`page-item ${categories.pageable.pageNumber === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(categories.pageable.pageNumber - 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {[...Array(categories.pageable.totalPages)].map((_, pageIndex) => (
                            <li key={pageIndex} className={`page-item ${pageIndex === categories.pageable.pageNumber ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(pageIndex)}>
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${categories.pageable.pageNumber === categories.pageable.totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(categories.pageable.pageNumber + 1)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};

export default ProductCategory;

