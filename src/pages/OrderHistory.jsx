import { useFetchOrderHistory } from '../services/OrderService';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import NavBar from '../components/navbar/NavBar';
import { Link, useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const userId = useSelector((state) => state.auth.user?.data.authResponse.user.id);
    const navigate = useNavigate();
    const { data: orders, isLoading, error } = useFetchOrderHistory(userId);

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

    if (!orders || orders.length === 0) {
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

    return (
        <>
            <NavBar />
            <div className="container-fluid py-5 my-5">
                <div className="container">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                    <h2>Your Orders</h2>
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="border rounded p-4 mb-4"
                            style={{ backgroundColor: "#f9f9f9" }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1">Order placed</p>
                                    <p className="text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Total</p>
                                    <p className="text-primary">${order.totalAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Ship to</p>
                                    <p className="text-primary">{order.customer}</p>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Order #</p>
                                    <p className="text-primary">{order.orderId}</p>
                                </div>
                            </div>
                            <hr />
                            <div>
                                {order.orderItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex mb-3 align-items-start"
                                    >
                                        <img
                                            src={item.imageUrl || "placeholder.jpg"}
                                            alt={item.productName}
                                            className="img-thumbnail me-3"
                                            style={{ width: "80px", height: "80px" }}
                                        />
                                        <div>
                                            <p className="mb-1">{item.productName}</p>
                                            <p className="text-muted mb-1">Quantity: {item.productQuantity}</p>
                                            <p className="text-muted mb-1">Total: ${item.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Link
                                    to={`/user/orders/${order.orderId}`}
                                    className="btn btn-outline-primary me-2"
                                >
                                    Order Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrderHistory;
