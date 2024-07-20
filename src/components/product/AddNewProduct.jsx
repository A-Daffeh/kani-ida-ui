import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";

const AddNewProduct = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header pageTitle="Products" />
      <div className="container form-container">
        <div className="register" id="register">
          <h2 className="text-danger text-center my-5">Add New Product</h2>
          <form>
            <div className="row g-3">
              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="imageUrl">
                  Image URL
                </label>
                <input type="file" className="form-control" id="imageUrl" />
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input type="text" className="form-control" id="name" />
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="price">
                  Price $
                </label>
                <input type="text" className="form-control" id="price" />
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="availability">
                  Availability
                </label>
                <input type="text" className="form-control" id="availability" />
              </div>
              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="quantity">
                  Quantity
                </label>
                <input type="text" className="form-control" id="quantity" />
              </div>

              <div className="col-md-6 text-dark">
                <label className="form-label" htmlFor="category">
                  Category
                </label>
                <select className="form-control" id="category">
                  <option value="">Select Category</option>
                  <option value="spice">Spice</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                </select>
              </div>

              <div className="col-md-12 text-dark">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea className="form-control" id="description" rows="3"></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-5">
              <button className="btn btn-danger" type="submit">
                Create
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
