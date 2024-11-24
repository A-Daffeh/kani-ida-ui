import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useFetchOrder } from '../services/OrderService';
import { Spinner } from 'react-bootstrap';
import NavBar from '../components/navbar/NavBar';
import Header from '../components/header/Header';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, error } = useFetchOrder(orderId);

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
                <div className="container-fluid py-5 my-5">
                    <div className="container py-5 text-center">
                        <p className="text-danger">Failed to load order details.</p>
                    </div>
                </div>
            </>
        );
    }

    if (!order) {
        return (
            <>
                <div className="container-fluid py-5 my-5">
                    <div className="container py-5 text-center">
                        <p className="text-danger">No order details available.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header pageTitle="Order Details" />
            <div className="container">
            <button
                        className="btn btn-secondary mb-2"
                        onClick={() => navigate('/ordered/products')}
                    >
                        Back to Orders
                    </button>
                <div className="container-fluid">
                    <div
                        key={order.orderId}
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
                </div>
            </div>
        </>
    );
};

OrderDetails.propTypes = {
    order: PropTypes.shape({
        orderId: PropTypes.number,
        customer: PropTypes.string,
        orderStatus: PropTypes.string,
        totalAmount: PropTypes.number,
        shipmentTrackingUrl: PropTypes.string,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                productName: PropTypes.string,
                productQuantity: PropTypes.number,
                totalPrice: PropTypes.number,
                imageUrl: PropTypes.string,
            })
        ),
    }),
};

export default OrderDetails;
