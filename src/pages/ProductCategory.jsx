import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import { fetchCategories } from '../components/store/actions/CategoryActions';

const ProductCategory = () => {
    const dispatch = useDispatch();
    const { categories, loading, error, pageable } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories({ page: 0, size: 10 }));
    }, [dispatch]);

    const handlePageChange = (pageNumber) => {
        dispatch(fetchCategories({ page: pageNumber, size: pageable.pageSize }));
    };

    return (
        <>
            <Header pageTitle="Product Categories" />
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product/category">
                    <Button variant="light product-btn">Add Product Category</Button>{' '}
                </Link>
            </span>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {categories && categories.content && categories.content.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr className="header-border">
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.content.map((category, index) => (
                            <tr key={category.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No categories available</p>
            )}
            {pageable && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-custom">
                        <li className={`page-item ${pageable.pageNumber === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(pageable.pageNumber - 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {[...Array(pageable.totalPages)].map((_, pageIndex) => (
                            <li key={pageIndex} className={`page-item ${pageIndex === pageable.pageNumber ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(pageIndex)}>
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${pageable.pageNumber === pageable.totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(pageable.pageNumber + 1)} aria-label="Next">
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
