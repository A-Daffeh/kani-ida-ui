import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NavBar from "../navbar/NavBar";
import api from "../config/api"; // Assuming you have an API config for axios instance
import { showToast } from "../layouts/Toast"; // Assuming a toast notification system

const ViewCustomerAddresses = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const user = useSelector((state) => state.auth.user);
  const currentUser = user?.data?.authResponse?.user || {};
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState(currentUser?.addresses || []);
  const queryClient = useQueryClient();

  // Mutation to update an address
  const { mutate: updateAddress, isLoading: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/admin/users/${currentUser.id}/addresses/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", currentUser.id]); // Invalidate cache to refresh data
      showToast("Address updated successfully", "success");
      handleModalClose();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Failed to update address";
      showToast(errorMessage, "error");
    },
  });

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAddress(null);
  };

  const handleModalShow = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    if (selectedAddress) {
      updateAddress(selectedAddress);
    }
  };

  const handleRemoveAddress = (addressId) => {
    removeAddress(
      { userId: currentUser.id, addressId },
      {
        onSuccess: (data) => {
          const updatedAddresses = data.data.user.addresses;

          // Update local state
          setAddresses(updatedAddresses);

          // Update Redux state
          dispatch(updateAddresses(updatedAddresses));

          showToast("Address removed successfully", "success");
        },
        onError: () => {
          showToast("Failed to remove address", "error");
        },
      }
    );
  };

  const handleReturn = () => {
    navigate("/");
  };

  // Pagination logic
  const totalPages = Math.ceil(addresses.length / itemsPerPage);
  const paginatedAddresses = addresses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        {/* Header with "Edit Addresses" button */}
        <div className="d-flex justify-content-between align-items-center my-5">
          <h2 className="text-danger">View User Addresses</h2>
          <button className="btn btn-primary" onClick={() => handleModalShow({})}>
            Edit Addresses
          </button>
        </div>

        <div className="row">
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Address {index + 1}</h5>
                    <p className="card-text">Street: {address.street}</p>
                    <p className="card-text">City: {address.city}</p>
                    <p className="card-text">State: {address.state}</p>
                    <p className="card-text">Postal Code: {address.postalCode}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-link" onClick={() => handleModalShow(address)}>
                      Edit
                    </button>
                    <button className="btn btn-link text-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="form-control">No address available</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <div className="d-flex justify-content-end mt-5">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleReturn}
          >
            Back
          </button>
        </div>

        {/* Modal for adding/updating an address */}
        <Modal show={showModal} onHide={handleModalClose} style={{ marginTop: "100px" }}>
          <Modal.Header closeButton>
            <Modal.Title className="text-dark">{selectedAddress?.id ? "Edit Address" : "Add New Address"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={selectedAddress?.street || ""}
                  onChange={handleInputChange}
                  placeholder="Enter street"
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={selectedAddress?.city || ""}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </Form.Group>

              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={selectedAddress?.state || ""}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </Form.Group>

              <Form.Group controlId="formPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={selectedAddress?.postalCode || ""}
                  onChange={handleInputChange}
                  placeholder="Enter postal code"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveAddress} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Address"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ViewCustomerAddresses;
