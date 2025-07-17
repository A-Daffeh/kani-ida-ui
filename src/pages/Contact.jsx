import { useState } from "react";
import NavBar from "../components/navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layouts/Footer";

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
      // .post("https://kaniidaandbeyond.com/public/contact/create", formState)
      .post("http://localhost:8082/public/contact/create", formState)
      .then(() => navigate("/thankyoupage"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      <div className="contact" style={{ overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div className="container flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10">
              <div
                className="contact-container p-4"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap", 
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  maxWidth: "100%", 
                  marginBottom: "20px", // Added to ensure space before the footer
                }}
              >
                <div className="col-12 col-lg-7">
                  <p className="text-left text-muted">
                    Fill out the following form and we will be in contact with you as soon as possible
                  </p>
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
                      <button type="submit" className="btn btn-danger w-100">Submit</button>
                    </div>
                  </form>
                </div>

                <div className="col-12 col-lg-4 text-dark mt-4 mt-lg-0">
                  <div className="text-center">
                    <img
                      className="img-fluid"
                      src="src/assets/contactcard.png"
                      alt="Light Bulb"
                      style={{ maxWidth: "100%", marginBottom: "20px" }}
                    />
                  </div>

                  <div className="contact-info text-left" style={{ fontSize: "1.20rem" }}>
                    <p>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> 1234 Maple Street Everett, WA 98201
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faPhone} /> 425-333-4353
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faEnvelope} /> InspirationalGenerations@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contact;

