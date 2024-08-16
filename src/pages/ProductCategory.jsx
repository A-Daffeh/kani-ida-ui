import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import SearchBar from '../components/layouts/SearchBar';
import { useFetchCategories, useAddCategory } from '../services/ProductCategoryService';

const ProductCategory = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { data: categories, isLoading, error } = useFetchCategories({ page: currentPage, size: 10 });
    const { mutate: addCategory, isLoading: isAdding } = useAddCategory();

    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        addCategory(newCategory, {
            onSuccess: () => {
                setNewCategory({ name: '', description: '' }); // Reset the form
            },
        });
    };

    return (
        <>
            <Header pageTitle="Product Categories" />
            <SearchBar />
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product/category">
                    <Button variant="light product-btn">Add Product Category</Button>{' '}
                </Link>
            </span>
            <Form onSubmit={handleAddCategory} className="mb-4">
                <Form.Group controlId="categoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="categoryDescription" className="mt-2">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={newCategory.description}
                        onChange={handleInputChange}
                        placeholder="Enter category description"
                    />
                </Form.Group>
                <Button type="submit" className="mt-3" disabled={isAdding}>
                    {isAdding ? 'Adding...' : 'Add Category'}
                </Button>
            </Form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
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
