import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

function Dashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <div className="sidebar bg-dark text-white p-3 round-sidebar">
            <h4>Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Add products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  User Management
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Ordered Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>

          <div className="content p-4 flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="text-dark">Dashboard</h1>
                <p className="text-dark">Welcome back, Ida</p>
              </div>
              <div className="text-right">
                <h2 className="text-dark">Ida Bojang</h2>
                <p className="text-dark">idabojang@gmail.com</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Revenue</Card.Title>
                    <Card.Text>$2400.50</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Expenses</Card.Title>
                    <Card.Text>$1850.20</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Sales</Card.Title>
                    <Card.Text>5678</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="row mt-4">
  <div className="col-12">
    <h2 className="text-dark">Recent Messages</h2>
    <Card className="rounded-corners">
      <Card.Body>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Message</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mustapha Samura</td>
              <td>How can I track my package?</td>
              <td>Answered</td>
              <td>Yesterday</td>
            </tr>
            <tr>
              <td>Khadija Njie</td>
              <td>When are you restocking your red pepper?</td>
              <td>Pending</td>
              <td>07/06/2024</td>
            </tr>
            <tr>
              <td>Adama Traore</td>
              <td>Are there any Discount code's?</td>
              <td>Pending</td>
              <td>07/01/2024</td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  </div>
</div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
