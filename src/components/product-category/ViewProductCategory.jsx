import React from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function ViewProductCategory({ category }) {
  const navigate = useNavigate();

  const HandleReturn = () => {
    navigate("/product/category");
  };

  return (
    <>
      <Header pageTitle="Products Categories" />
      <div className="container form-container">
        <div className="register" id="register">
          <h2 className="text-danger text-center my-5">View Product Category</h2>

          <div className="row g-3">
            <div className="col-md-12 text-dark">
              <h4>Name</h4>
              {/* Display the Name from Props */}
              <p className="form-control">{category.name}</p>
            </div>
            <div className="col-md-12 text-dark">
              <h4>Description</h4>
              {/* Display the Description from Props */}
              <p className="form-control">{category.description}</p>
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
      </div>
    </>
  );
}

export default ViewProductCategory;
