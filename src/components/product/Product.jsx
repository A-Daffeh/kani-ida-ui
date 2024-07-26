import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/ProductActions';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Product = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 10 }));
    }, [dispatch]);

    return (
        <>
            <Header pageTitle="Products" />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
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
                    {products.map((product, index) => (
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
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product">
                    <Button variant="light product-btn">Add new Product</Button>{' '}
                </Link>
            </span>
        </>
    );
}

export default Product;
