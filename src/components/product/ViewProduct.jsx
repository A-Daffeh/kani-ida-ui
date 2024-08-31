import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

function ViewProduct({ product }) {
    const navigate = useNavigate();

    const HandleReturn = () => {
        navigate("/products");
    };

    return (
        <>
            <Header pageTitle="Products" />
            <div className="container form-container">
                <div className="register" id="register">
                    <h2 className="text-danger text-center my-5">View Product</h2>

                    <div className="row g-3">
                        <div className="col-12 text-dark">
                            <h5>Name</h5>
                            <p className="form-control">{product.name}</p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Price</h5>
                            <p className="form-control">{product.price}</p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Availability</h5>
                            <p className="form-control">{product.availability}</p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Quantity</h5>
                            <p className="form-control">{product.quantity}</p>
                        </div>
                        <div className="col-md-6 text-dark">
                            <h5>Category</h5>
                            <p className="form-control">{product.category}</p>
                        </div>
                        <div className="col-12 text-dark">
                            <h5>Description</h5>
                            <textarea className="form-control" rows="3" readOnly>{product.description}</textarea>
                        </div>
                        <div className="col-12 text-dark">
                            <h5>Image URL</h5>
                            <p className="form-control">{product.imageurl}</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={HandleReturn}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewProduct;



/*



              <button
                className="btn btn-secondary"
                type="button"
                onClick={HandleReturn}
              >
                Back
              </button>
           
              */
