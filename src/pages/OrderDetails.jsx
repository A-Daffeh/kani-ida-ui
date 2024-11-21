import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useFetchOrder } from '../services/OrderService';
import { Spinner } from 'react-bootstrap';
import NavBar from '../components/navbar/NavBar';

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
                <NavBar />
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
                <NavBar />
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
            <NavBar />
            <div className="container-fluid py-5 my-5">
                <div className="container">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/user/orders')}
                    >
                        Back to Orders
                    </button>
                    <h2>Order Details</h2>
                    <div className="border rounded p-4 mb-4" style={{ backgroundColor: "#f9f9f9" }}>
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
                                <p className="text-muted mb-1">Status</p>
                                <p className="text-primary">{order.orderStatus}</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h3>Items</h3>
                            {order.orderItems.map((item) => (
                                <div key={item.id} className="d-flex mb-3 align-items-start">
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
