import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";

const ViewCustomerProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const currentUser = user.data.authResponse.user;

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  console.log(user);
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="register" id="register">
          <h2 className="text-danger text-center my-5">View Profile</h2>

          <div className="row g-3">
            <div className="col-12 text-dark">
              <h5>Name</h5>
              <p className="form-control">{currentUser.fullName}</p>
            </div>
            <div className="col-md-6 text-dark">
              <h5>Email</h5>
              <p className="form-control">{currentUser.email}</p>
            </div>
            <div className="col-md-6 text-dark">
              <h5>Role</h5>
              <p className="form-control">{currentUser.role}</p>
            </div>
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
    </>
  );
};

export default ViewCustomerProfile;


// create another item in the dropdown in settings and call it my addresses, and add a seperate page with multiple cards with multiple addresses