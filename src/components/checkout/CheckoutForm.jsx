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
        setError(null); // Clear any previous errors
    };

    const handleNewAddressModal = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        // Reset form fields when closing modal
        setNewFullName('');
        setNewStreet('');
        setNewCity('');
        setNewState('');
        setNewPostalCode('');
    };

    const handleUseNewAddress = () => {
        // Validate required fields
        if (!newFullName.trim() || !newStreet.trim() || !newCity.trim() || !newState.trim() || !newPostalCode.trim()) {
            setError('Please fill in all address fields');
            return;
        }

        const newAddressObj = {
            street: newStreet.trim(),
            city: newCity.trim(),
            state: newState.trim(),
            postalCode: newPostalCode.trim(),
        };
        setSelectedAddress(newAddressObj);
        setName(newFullName.trim());
        setNewAddress(true);
        setShowModal(false);
        setError(null); // Clear any previous errors
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Clear any previous errors
        setError(null);
        
        // Validation checks
        if (!cartId) {
            setError("No cart available. Please try again.");
            return;
        }

        if (!selectedAddress) {
            setError("Please select or add a delivery address.");
            return;
        }

        if (!name.trim()) {
            setError("Please provide a customer name.");
            return;
        }

        if (!user?.id) {
            setError("User information is missing. Please log in again.");
            return;
        }

        setLoading(true);
    
        try {
            // Create the order request payload
            const orderRequest = {
                customer: name.trim(),
                deliveryAddress: selectedAddress
            };

            const mutationParams = { 
                userId: user.id, 
                cartId, 
                orderRequest 
            };

            console.log('Creating order with params:', mutationParams);

            createOrder.mutate(
                mutationParams,
                {
                    onSuccess: (paymentData) => {
                        console.log('Order creation successful, payment data:', paymentData);
                        
                        // The OrderService now handles the redirect automatically
                        // This is just a fallback in case the service redirect fails
                        setLoading(false);
                    },
                    onError: (error) => {
                        console.error('Order creation failed:', error);
                        
                        // Better error message extraction
                        let errorMessage = 'Order creation failed. Please try again.';
                        
                        if (error?.response?.data?.message) {
                            errorMessage = error.response.data.message;
                        } else if (error?.message) {
                            errorMessage = error.message;
                        } else if (typeof error === 'string') {
                            errorMessage = error;
                        }
                        
                        setError(errorMessage);
                        setLoading(false);
                    }
                }
            );
        } catch (err) {
            console.error('Unexpected error:', err);
            setError('Something went wrong. Please try again.');
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
                                    <div className="form-check mb-2" key={index}>
                                        <input
                                            type="radio"
                                            id={`address-${index}`}
                                            name="address"
                                            className="form-check-input"
                                            checked={selectedAddress?.id === addr.id && !newAddress}
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

                        {userAddresses.length === 0 && (
                            <div>
                                <p className="text-dark mb-3">No saved addresses found.</p>
                                <button 
                                    type="button" 
                                    className="btn btn-outline-primary"
                                    onClick={handleNewAddressModal}
                                >
                                    Add New Address
                                </button>
                            </div>
                        )}

                        {newAddress && selectedAddress && (
                            <div className="mt-3 p-3 border rounded bg-white">
                                <strong className="text-dark">Selected New Address:</strong>
                                <p className="text-dark mb-0 mt-2">
                                    <strong>{name}</strong><br />
                                    {selectedAddress.street}<br />
                                    {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.postalCode}
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-danger w-100 mt-3"
                            onClick={handleSubmit}
                            disabled={loading || !selectedAddress}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
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
                                    <p className="text-dark mb-0">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="border-top pt-3">
                            <p className="d-flex justify-content-between text-dark mb-0">
                                <span>Subtotal</span> 
                                <span><strong>${totalAmount.toFixed(2)}</strong></span>
                            </p>
                        </div>
                        <button className="btn btn-outline-secondary w-100 mt-3" onClick={() => navigate(-1)}>
                            Back to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Adding New Address */}
            <Modal show={showModal} onHide={handleModalClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="new-fullname" className="form-label">Full Name *</label>
                            <input
                                type="text"
                                id="new-fullname"
                                className="form-control"
                                value={newFullName}
                                onChange={(e) => setNewFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-street" className="form-label">Street Address *</label>
                            <input
                                type="text"
                                id="new-street"
                                className="form-control"
                                value={newStreet}
                                onChange={(e) => setNewStreet(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-city" className="form-label">City *</label>
                            <input
                                type="text"
                                id="new-city"
                                className="form-control"
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-state" className="form-label">State *</label>
                            <input
                                type="text"
                                id="new-state"
                                className="form-control"
                                value={newState}
                                onChange={(e) => setNewState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-postal-code" className="form-label">Postal Code *</label>
                            <input
                                type="text"
                                id="new-postal-code"
                                className="form-control"
                                value={newPostalCode}
                                onChange={(e) => setNewPostalCode(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleUseNewAddress}
                        disabled={!newFullName.trim() || !newStreet.trim() || !newCity.trim() || !newState.trim() || !newPostalCode.trim()}
                    >
                        Use This Address
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