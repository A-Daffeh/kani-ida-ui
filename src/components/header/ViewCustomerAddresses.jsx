import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";
import { useAddUserAddress, useRemoveUserAddress } from "../../services/UserService";
import { showToast } from "../layouts/Toast";
import { updateAddresses } from "../config/AuthSlice";

const ViewCustomerAddresses = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const user = useSelector((state) => state.auth.user);
  const currentUser = user?.data?.authResponse?.user || {};
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [addresses, setAddresses] = useState(currentUser?.addresses || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const { mutate: addAddress } = useAddUserAddress();
  const { mutate: removeAddress } = useRemoveUserAddress();

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    addAddress(
      {
        userId: currentUser.id,
        addressRequest: newAddress,
      },
      {
        onSuccess: (data) => {
          const updatedAddresses = data.data.user.addresses;
          // Update local state
          setAddresses(updatedAddresses);
          // Update Redux state
          dispatch(updateAddresses(updatedAddresses));
          showToast("Address added successfully", "success");
        },
        onError: () => {
          showToast("Failed to add address", "error");
        },
      }
    );
    handleModalClose();
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
        <h2 className="text-danger text-center my-5">View User Addresses</h2>

        {/* Add Address button */}
        <div className="d-flex justify-content-start mb-4">
          <button className="btn btn-primary mb-3" onClick={handleModalShow}>
            Add Address
          </button>
        </div>

        <div className="row">
          {paginatedAddresses.length > 0 ? (
            paginatedAddresses.map((address, index) => (
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
                    <button className="btn btn-link">Edit</button>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleRemoveAddress(address.id)}
                    >
                      Remove
                    </button>
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

        <Modal
          show={showModal}
          onHide={handleModalClose}
          style={{ marginTop: "100px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-dark">Add New Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  placeholder="Enter street"
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </Form.Group>
              <Form.Group controlId="formPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={newAddress.postalCode}
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
            <Button variant="primary" onClick={handleSaveAddress}>
              Save Address
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ViewCustomerAddresses;
