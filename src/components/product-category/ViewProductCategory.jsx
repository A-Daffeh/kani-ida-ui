import React from "react";
import Header from "../header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCategoryById } from "../../services/ProductCategoryService";

function ViewProductCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: category, isLoading, error } = useFetchCategoryById(id);

  const handleReturn = () => {
    navigate("/product/category");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <Header pageTitle="Product Categories" />
      <div className="container form-container">
        <div className="register" id="register">
          <h2 className="text-danger text-center my-5">View Product Category</h2>

          <div className="row g-3">
            <div className="col-md-12 text-dark">
              <h4>Name</h4>
              <p className="form-control">{category.name}</p>
            </div>
            <div className="col-md-12 text-dark">
              <h4>Description</h4>
              <p className="form-control">{category.description}</p>
            </div>
            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleReturn}
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
