import React, { useState } from "react";

import NavBar from "../navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
function Contact() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formState);
    axios
      .post
      // "http://localhost:8080/public/contact/create",formState
      ()
      .then(navigate("/thankyoupage")) // should navigate to the thank you page
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row mt-5">
          <h2 className=" text-center text-dark my-5">
            Fill out the following form to contact us{" "}
          </h2>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-lg-4">
            <Card className="mt-5" style={{ width: "20rem", height: "8rem" }}>
              <Card.Body>
                <Card.Text>
                  <h5>
                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                    Phone Number
                  </h5>
                  <p>+1 - (234) - 567 - 8910</p>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card
              style={{ width: "20rem", height: "8rem" }}
              className="mt-5 mb-5"
            >
              <Card.Body>
                <Card.Text>
                  <h5>
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Address:
                  </h5>
                  <p>abc@hotmail.com</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-lg-8 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group text-dark m-2">
                <label htmlFor="exampleInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="exampleInputPhone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPhone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-dark m-2">
                <label htmlFor="exampleFormControlReason">
                  Reason For Contact
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlReason"
                  name="reason"
                  rows="3"
                  value={formState.reason}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12 text-center mt-5">
                <button type="submit" className="btn btn-danger w-100">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
