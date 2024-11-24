import { useFetchOrderHistory } from '../services/OrderService';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import NavBar from '../components/navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrderHistory = () => {
    const userId = useSelector((state) => state.auth.user?.data.authResponse.user.id);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    const { data: orders, isLoading, error } = useFetchOrderHistory(userId, currentPage, pageSize);

    const totalPages = orders?.totalPages || 1;

    if (isLoading) {
        return (
            <>
                <NavBar />
                <div className="container-fluid py-5 my-5">
                    <div className="container py-5 text-center">
                        <Spinner animation="border" />
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <div className="container-fluid py-5 my-5">
                    <div className="container py-5 text-center">
                        <p className="text-danger">Failed to load order history.</p>
                    </div>
                </div>
            </>
        );
    }

    if (!orders || orders.content.length === 0) {
        return (
            <>
                <NavBar />
                <div className="container-fluid py-5 my-5">
                    <div className="container py-5 text-center">
                        <p className="text-danger">No orders found.</p>
                    </div>
                </div>
            </>
        );
    }

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <NavBar />
            <div className="container-fluid py-5 my-5">
                <div className="container">
                    <button
                        className="btn btn-secondary mb-2"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                    {orders.content.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded p-4 mb-4"
                            style={{ backgroundColor: "#f9f9f9" }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted fw-bold mb-1">{order.orderStatus}</p>
                                    <p className="text-warning fw-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Total</p>
                                    <p className="text-warning fw-bold">${order.totalAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Ship to</p>
                                    <p className="text-warning fw-bold">
                                        {order.customer}
                                    </p>
                                    <p className="text-warning">
                                        {order.deliveryAddress?.street}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state} {order.deliveryAddress?.postalCode}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Order #</p>
                                    <p className="text-warning fw-bold">{order.orderNumber}</p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                {order.orderItems.map((item) => (
                                    <div
                                        key={item.orderItemId}
                                        className="d-flex mb-3 align-items-start"
                                    >
                                        <img
                                            src={item.imageUrl || "placeholder.jpg"}
                                            alt={item.productName}
                                            className="img-thumbnail me-3"
                                            style={{ width: "80px", height: "80px" }}
                                        />
                                        <div>
                                            <p className="text-warning fw-bold mb-1">{item.productName}</p>
                                            <p className="text-muted mb-1">
                                                Quantity: <strong>{item.quantity}</strong>
                                            </p>
                                            <p className="text-muted mb-1">
                                                Total: <strong>${item.totalPrice.toFixed(2)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination pagination-custom">
                            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map((page) => (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageClick(page)}>{page + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handleNextPage} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default OrderHistory;
