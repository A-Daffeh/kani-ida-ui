import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Assuming Bootstrap for styling
import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";

const ViewCustomerAddresses = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUser = user?.data?.authResponse?.user || {}; // Fallback to an empty object
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: ""
  });
  const [addresses, setAddresses] = useState(currentUser?.addresses || []); // Fallback to an empty array

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSaveAddress = () => {
    setAddresses([...addresses, newAddress]); // Add new address to the list
    handleModalClose();
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h2 className="text-danger text-center my-5">View User Addresses</h2>

        {/* Add Address button at the top */}
        <div className="d-flex justify-content-start mb-4">
          <button 
            className="btn btn-primary mb-3" 
            onClick={handleModalShow}
          >
            Add Address
          </button>
        </div>

        <div className="row">
          {addresses?.length > 0 ? (
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
                    <button className="btn btn-link">Edit</button>
                    <button className="btn btn-link text-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="form-control">No address available</p>
          )}
        </div>

        <div className="d-flex justify-content-end mt-5">
          <button className="btn btn-secondary" type="button" onClick={handleReturn}>
            Back
          </button>
        </div>

        {/* Modal for adding a new address */}
       {/* Modal for adding a new address */}
<Modal 
  show={showModal} 
  onHide={handleModalClose} 
  style={{ marginTop: '100px' }} // Adjust this value to move it down
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
