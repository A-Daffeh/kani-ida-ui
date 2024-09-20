import { useState } from 'react';
import PropTypes from 'prop-types';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import api from '../config/api';
import { useCreateOrder } from '../../services/OrderService';

const CheckoutForm = ({ cartItems, totalAmount }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const user = useSelector((state) => state.auth.user?.data.authResponse.user);
    const userAddress = user?.addresses?.[0];

    const [email, setEmail] = useState(user?.email || '');
    const [name, setName] = useState(user?.fullName || '');
    const [country, setCountry] = useState(userAddress?.country || '');
    const [address, setAddress] = useState(userAddress?.street || '');

    const createOrder = useCreateOrder();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // Fetch payment intent from backend
            const { data } = await api.post('/api/payment/create-payment-intent', { amount: totalAmount * 100 });
            const clientSecret = data.clientSecret;

            // Confirm the payment using Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
            } else if (result.paymentIntent.status === 'succeeded') {
                // Payment successful, create order
                const orderRequest = {
                    cartItems,
                    totalAmount,
                    shippingAddress: {
                        name,
                        country,
                        address,
                    },
                };
                createOrder.mutate({ userId: user?.id, orderRequest });
                alert('Payment Successful!');
                setLoading(false);
            }
        } catch (err) {
            setError('Payment failed. Try again.');
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                {/* Payment Form Section */}
                <div className="col-md-7 mb-4">
                    <div className="p-4 bg-light rounded">
                        <h2 className="mb-3 text-dark">Payment Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-dark">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-dark">Shipping Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="country" className="form-label text-dark">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Country"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label text-dark">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    required
                                />
                            </div>

                            <h3 className="mb-3 text-dark">Card Information</h3>
                            <div className="mb-3">
                                <CardElement className="form-control p-3" />
                            </div>

                            <div className="form-check mb-4">
                                <input type="checkbox" id="same-as-shipping" className="form-check-input" />
                                <label htmlFor="same-as-shipping" className="form-check-label text-dark">
                                    Billing address is same as shipping
                                </label>
                            </div>

                            {error && <p className="text-danger">{error}</p>}
                            <button
                                type="submit"
                                className="btn btn-danger w-100"
                                disabled={loading || !stripe}
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Cart Summary Section */}
                <div className="col-md-5">
                    <div className="p-4 bg-light rounded">
                        <h3 className="mb-3 text-dark">Cart Summary</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="d-flex mb-3 align-items-center">
                                <img src={item.imageUrl} alt={item.productName} className="img-thumbnail me-3" style={{ width: '80px', height: '80px' }} />
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
                        <button className="btn btn-danger w-100">Back</button>
                    </div>
                </div>
            </div>
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
};

export default CheckoutForm;
