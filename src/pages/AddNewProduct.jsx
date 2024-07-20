import React from 'react';
import Header from "../components/header/Header";


const AddNewProduct = () => {
  return (
    <>
      <Header pageTitle={"Dashboard"} />
      <div className="container form-container">
        <h2 className="text-danger text-center mt-5">Add New Product</h2>
        <div className="register" id="register">
          <form>
            <div className="row g-3">
              <div className="col-12 text-dark">
                <label className="form-label" htmlFor="imageUrl">
                  Image URL
                </label>
                <input type="text" className="form-control" id="imageUrl" />
              </div>
            </div>

            <div className="row g-3">
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
            </div>

            <div className="row g-3">
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
            </div>

            <div className="row g-3">
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
            </div>

            <div className="row g-3">
              <div className="col-12 text-dark">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea className="form-control" id="description" rows="3"></textarea>
              </div>
            </div>

            <span className="forgotpass-login mt-5">
              <button className="btn btn-danger" type="submit">
                Add New Product
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;
