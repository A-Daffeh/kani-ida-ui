import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import { fetchCategories } from '../components/store/actions/CategoryActions';

const ProductCategory = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories({ page: 0, size: 10 }));
    }, [dispatch]);

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
            <table className="table">
                <thead>
                    <tr className="header-border">
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-custom">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default ProductCategory;
