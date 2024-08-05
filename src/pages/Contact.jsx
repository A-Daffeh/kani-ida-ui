import { useState } from "react";
import NavBar from "../components/navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

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
          </div>
          <div className="row justify-content-center">
            
            <div className="col-12 col-md-10">
              <div className="contact-container p-4" style={{ border: "1px solid #ddd", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="col-12 col-lg-7">
                <h2 className=" text-dark">Contact Us</h2>
                <p className="text-center text-muted">Fill out the following form and we will be in contact with you as soon as possible</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group text-dark m-2">
                      <label htmlFor="exampleInputName">Enter your name</label>
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
                      <label htmlFor="exampleInputEmail1">Enter your Email address</label>
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
                      <label htmlFor="exampleInputPhone">Enter your Phone Number</label>
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
                      <label htmlFor="exampleFormControlReason">Enter your Reason for Contacting us</label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlReason"
                        name="reason"
                        rows="3"
                        value={formState.reason}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12 text-center mt-4">
                      <button type="submit" className="btn btn-danger w-100">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-lg-4 text-dark">
                  <div className="contact-info">
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 1234 Maple Street Everett, WA 98201</p>
                    <p><FontAwesomeIcon icon={faPhone} /> 425-333-4353</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> ldabojang@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
