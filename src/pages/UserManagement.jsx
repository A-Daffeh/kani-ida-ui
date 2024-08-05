import Header from "../components/header/Header";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SearchBar from "../components/layouts/SearchBar";

const UserManagement = () => {
  return (
    <>
      <Header pageTitle="User Management" />
      <SearchBar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User Management</h2>
      </div>
      <span className="d-flex justify-content-end mb-2">
                <Link to="/new/user">
                    <Button variant="light product-btn">Add new User </Button>{' '}
                </Link>
            </span>
      <table className="table">
        <thead>
          <tr className="header-border">
            <th scope="col">Full Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Joined</th>
            <th scope="col">Status</th>
            <th scope="col">Permissions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ida Bojang</td>
            <td>425-212-2322</td>
            <td>July 1st 2024</td>
            <td>Active</td>
            <td><span className="badge badge-admin">Admin</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Amadou Trawally</td>
            <td>425-323-3456</td>
            <td>July 1st 2024</td>
            <td>Active</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Bakary Jammeh</td>
            <td>425-234-4389</td>
            <td>July 2nd 2024</td>
            <td>Inactive</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Bakary Jammeh</td>
            <td>425-214-2222</td>
            <td>July 4th 2024</td>
            <td>Active</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Khadija Drammeh</td>
            <td>425-445-5545</td>
            <td>July 6th 2024</td>
            <td>Active</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Yaya Colley</td>
            <td>425-332-2211</td>
            <td>July 7th 2024</td>
            <td>Inactive</td>
            <td><span className="badge badge-admin">Admin</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Momodou Jallow</td>
            <td>206-343-3422</td>
            <td>July 7th 2024</td>
            <td>Inactive</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Musa Janneh</td>
            <td>206-234-7578</td>
            <td>July 7th 2024</td>
            <td>Active</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>Saikou Sanyang</td>
            <td>206-234-7578</td>
            <td>July 7th 2024</td>
            <td>Active</td>
            <td><span className="badge badge-user">User</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-custom">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
    
  );
};

export default UserManagement;
