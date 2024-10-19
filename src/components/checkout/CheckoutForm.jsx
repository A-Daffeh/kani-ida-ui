import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useCreateOrder } from '../../services/OrderService';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const CheckoutForm = ({ cartItems, totalAmount, cartId }) => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [newFullName, setNewFullName] = useState('');
    const [newStreet, setNewStreet] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newState, setNewState] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');

    const user = useSelector((state) => state.auth.user?.data.authResponse.user);
    const userAddresses = user?.addresses || [];
    const [name, setName] = useState(user?.fullName || '');
    const createOrder = useCreateOrder();

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
        setNewAddress(false);
    };

    const handleNewAddressModal = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleUseNewAddress = () => {
        const newAddressObj = {
            street: newStreet,
            city: newCity,
            state: newState,
            postalCode: newPostalCode,
        };
        setSelectedAddress(newAddressObj);
        setName(newFullName);
        setNewAddress(true);
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
            // Ensure cartId is provided
            if (!cartId) {
                setError("No cart available. Please try again.");
                setLoading(false);
                return;
            }
    
            // Create the order request payload
            const orderRequest = {
                customer: name,  // Use customer name
                deliveryAddress: selectedAddress || {
                    street: newStreet,
                    city: newCity,
                    state: newState,
                    postalCode: newPostalCode
                }
            };
    
            createOrder.mutate(
                { userId: user?.id, cartId, orderRequest },  // Pass userId, cartId, and orderRequest
                {
                    onSuccess: (data) => {
                        const paymentUrl = data.payment?.paymentUrl;  // Retrieve payment link from response
                        if (paymentUrl) {
                            setTimeout(() => {
                                window.location.href = paymentUrl;  // Redirect to payment
                            }, 1000);
                        } else {
                            setError('Unable to retrieve payment link. Please try again.');
                        }
                        setLoading(false);
                    },
                    onError: () => {
                        setError('Order creation failed. Please try again.');
                        setLoading(false);
                    }
                }
            );
        } catch (err) {
            setError('Something went wrong. Try again.');
            setLoading(false);
        }
    };    

    return (
        <div className="container my-5">
            <div className="row">
                {/* Shipping Address Section */}
                <div className="col-md-7 mb-4">
                    <div className="p-4 bg-light rounded">
                        <h4 className="mb-3 text-dark">Shipping address</h4>
                        {userAddresses.length > 0 && (
                            <div>
                                {userAddresses.map((addr, index) => (
                                    <div className="form-check" key={index}>
                                        <input
                                            type="radio"
                                            id={`address-${index}`}
                                            name="address"
                                            className="form-check-input"
                                            checked={selectedAddress?.id === addr.id}
                                            onChange={() => handleAddressSelection(addr)}
                                        />
                                        <label className="form-check-label text-dark" htmlFor={`address-${index}`}>
                                            {name}<br />
                                            {addr.street}<br />
                                            {addr.city}, {addr.state}, {addr.postalCode}
                                        </label>
                                    </div>
                                ))}
                                <div className="form-check mt-3">
                                    <input
                                        type="radio"
                                        id="new-address"
                                        name="address"
                                        className="form-check-input"
                                        checked={newAddress}
                                        onChange={handleNewAddressModal}
                                    />
                                    <label className="form-check-label text-dark" htmlFor="new-address">
                                        Add a new address
                                    </label>
                                </div>
                            </div>
                        )}
                        {newAddress && selectedAddress && (
                            <div className="mt-3">
                                <strong>New Address:</strong>
                                <p className="text-dark">
                                    {selectedAddress.street}<br />
                                    {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.postalCode}
                                </p>
                            </div>
                        )}

                        {error && <p className="text-danger">{error}</p>}
                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                            onClick={handleSubmit}
                            disabled={loading || !selectedAddress}  // Disable if loading or no address selected
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>

                {/* Cart Summary Section */}
                <div className="col-md-5">
                    <div className="p-4 bg-light rounded">
                        <h3 className="mb-3 text-dark">Cart Summary</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="d-flex mb-3 align-items-center">
                                <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="img-thumbnail me-3"
                                    style={{ width: '80px', height: '80px' }}
                                />
                                <div className="flex-grow-1">
                                    <p className="mb-1 text-dark">{item.productName}</p>
                                    <p className="text-dark">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="border-top pt-3">
                            <p className="d-flex justify-content-between text-dark">
                                <span>Subtotal</span> <span>${totalAmount.toFixed(2)}</span>
                            </p>
                        </div>
                        <button className="btn btn-danger w-100" onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>

            {/* Modal for Adding New Address */}
            <Modal show={showModal} onHide={handleModalClose} style={{ zIndex: 99999 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="new-fullname" className="form-label">Full Name</label>
                        <input
                            type="text"
                            id="new-fullname"
                            className="form-control"
                            value={newFullName}
                            onChange={(e) => setNewFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new-street" className="form-label">Street</label>
                        <input
                            type="text"
                            id="new-street"
                            className="form-control"
                            value={newStreet}
                            onChange={(e) => setNewStreet(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new-city" className="form-label">City</label>
                        <input
                            type="text"
                            id="new-city"
                            className="form-control"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new-state" className="form-label">State</label>
                        <input
                            type="text"
                            id="new-state"
                            className="form-control"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new-postal-code" className="form-label">Postal Code</label>
                        <input
                            type="text"
                            id="new-postal-code"
                            className="form-control"
                            value={newPostalCode}
                            onChange={(e) => setNewPostalCode(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUseNewAddress}>
                        Use Address
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

CheckoutForm.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired
    })).isRequired,
    totalAmount: PropTypes.number.isRequired,
    cartId: PropTypes.number.isRequired, 
};

export default CheckoutForm;
