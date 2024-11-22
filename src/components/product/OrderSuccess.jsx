import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layouts/Footer';
import NavBar from '../navbar/NavBar';

function OrderSuccess() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    }

    return (
      <>
      <NavBar/>
        
<div className="contact" style={{ overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
<div className="container flex-grow-1">
<div className="flex-grow-1">
        <div className="container">
            <div className="row justify-content-center align-items-center">
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
        </div>
    </div>

</div>


<Footer />
</div>

        <Footer/>
        </>
    );
}

export default OrderSuccess;

