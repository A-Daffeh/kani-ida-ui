import { useLocation } from 'react-router-dom';
import Footer from '../layouts/Footer';
import NavBar from '../navbar/NavBar';
import { useState, useEffect, useRef } from 'react';
import { showToast } from '../layouts/Toast';
import api from "../config/api"

function OrderSuccess() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Get URL parameters from Stripe redirect
    const sessionId = queryParams.get('session_id');
    const userId = queryParams.get('user_id'); 
    const cartId = queryParams.get('cart_id');
    
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Add ref to track if payment capture has been called
    const hasCapturedPayment = useRef(false);

    useEffect(() => {
        const capturePayment = async () => {
            // Prevent duplicate calls
            if (hasCapturedPayment.current) {
                console.log('Payment capture already called, skipping...');
                return;
            }

            if (!sessionId || !userId || !cartId) {
                setError('Missing required payment information');
                setLoading(false);
                return;
            }

            // Mark as called immediately
            hasCapturedPayment.current = true;

            try {
                console.log('Capturing payment with:', { sessionId, userId, cartId });
                const checkResponse = await api.get('/public/order/check-status', {
                    params: {
                        session_id: sessionId
                    }
                });
                if(checkResponse.data){
                    setOrderData(checkResponse.data);
                }
                else{
                    const response = await api.get('/public/order/payment/success', {
                    params: {
                        session_id: sessionId,
                        user_id: userId,
                        cart_id: cartId
                    }
                });

                setOrderData(response.data);
                showToast('Order created successfully!', 'success');
                }
                // Call your backend success endpoint
                
            } catch (error) {
                console.error('Payment capture failed:', error);
                const errorMessage = error.response?.data?.message || 'Failed to process payment';
                setError(errorMessage);
                showToast(errorMessage, 'error');
                
                // Reset the flag on error so user can retry
                hasCapturedPayment.current = false;
            } finally {
                setLoading(false);
            }
        };

        capturePayment();
    }, [sessionId, userId, cartId]); // Add dependencies

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="contact" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                    <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Processing...</span>
                            </div>
                            <p className="mt-3">Processing your payment...</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <div className="contact" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                    <div className="container flex-grow-1">
                        <div className="row justify-content-center align-items-center">
                            <div className="order-error p-5" style={{ backgroundColor: '#ffe6e6', borderRadius: '15px' }}>
                                <h2 className="mb-4 text-danger">Payment Processing Error</h2>
                                <p className="text-dark">{error}</p>
                                <button onClick={() => window.location.href = '/cart'} className="btn btn-primary mt-4">
                                    Back to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="contact" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <div className="container flex-grow-1">
                    <div className="row justify-content-center align-items-center">
                        <div className="order-success p-5" style={{ backgroundColor: '#f0f8ff', borderRadius: '15px' }}>
                            <h2 className="mb-4 text-dark">Congratulations, your order has been placed!</h2>
                            <img src="/assets/checkmark.png" alt="Success" className="img-fluid mb-4" style={{ width: '150px' }} />
                            
                            {orderData && (
                                <>
                                    <h5 className="mb-2">
                                        <span className="text-dark">Order Number: {orderData.orderNumber}</span>
                                    </h5>
                                    <h5 className="mb-4">
                                        <span className="text-dark">Total Amount: ${orderData.totalAmount}</span>
                                    </h5>
                                </>
                            )}
                            
                            <p className="text-dark">Any and all updates will be sent to your email.</p>
                            <div className="mt-4">
                                <button onClick={() => window.location.href = '/'} className="btn btn-danger me-3">
                                    Back to Home
                                </button>
                                <button onClick={() => window.location.href = `/customer/orders`} className="btn btn-primary">
                                    View Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default OrderSuccess;