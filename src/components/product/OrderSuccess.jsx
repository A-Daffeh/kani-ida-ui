import { useLocation } from 'react-router-dom';
import Footer from '../layouts/Footer';
import NavBar from '../navbar/NavBar';

function OrderSuccess() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionNumber = queryParams.get('transactionNumber') || 'Not Available';

    return (
        <>
            <NavBar />
            <div className="contact" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <div className="container flex-grow-1">
                    <div className="row justify-content-center align-items-center">
                        <div className="order-success p-5" style={{ backgroundColor: '#f0f8ff', borderRadius: '15px' }}>
                            <h2 className="mb-4 text-dark">Congratulations, your order has been placed!</h2>
                            <img src="/assets/checkmark.png" alt="Success" className="img-fluid mb-4" style={{ width: '150px' }} />
                            <h5 className="mb-4">
                                <span className="transaction-number text-dark">Transaction Number: {transactionNumber}</span>
                            </h5>
                            <p className="text-dark">Any and all updates will be sent to your email.</p>
                            <button onClick={() => window.location.href = '/'} className="btn btn-danger mt-4">
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default OrderSuccess;
