import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    }

    return (
        <div className="container text-center mt-5">
            <div className="order-success p-5" style={{ backgroundColor: '#f0f8ff', borderRadius: '15px' }}>
                <h2 className="mb-4 text-dark">Congratulations your order has been placed!</h2>
                <img 
                    src="src/assets/checkmark.png" 
                    alt="Checkmark" 
                    className="img-fluid mb-4" 
                    style={{ width: '150px', height: '150px' }} 
                />
                <h5 className="mb-4">
                    <span className="transaction-number text-dark">Transaction Number: 1293dbs30230R</span>
                </h5>
                <hr/>
                <p className='text-dark'>Any and all updates will be sent to your email</p>
                
                <button 
                    onClick={handleBack} 
                    className="btn btn-danger mt-4"
                >
                    <i className="fas fa-arrow-left"></i> Back
                </button>
            </div>
        </div>
    );
}

export default OrderSuccess;