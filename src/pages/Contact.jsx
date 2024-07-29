import { useState } from "react";
import NavBar from "../components/navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import Footer from "../components/layouts/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const navigate = useNavigate();

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
      .post("http://localhost:8080/public/contact/create", formState)
      .then(() => navigate("/thankyoupage")) // should navigate to the thank you page
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      <div className="contact">
        <div className="container">
          <div className="row mb-2">
            <div className="col-12">
              <h2 className="text-center text-dark">contact us</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4">
              <Card style={{ width: "100%", height: "8rem" }} className="mt-4">
                <Card.Body>
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  Phone Number
                  <br />
                  <br />
                  +1 - (234) - 567 - 8910
                </Card.Body>
              </Card>

              <Card style={{ width: "100%", height: "8rem" }} className="mt-5">
                <Card.Body>
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Address
                  <br />
                  <br />
                  abc@hotmail.com
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-lg-8">
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
      </div>
    </>
  );
}

export default Contact;
