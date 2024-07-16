import Card from "react-bootstrap/Card";
import Header from "../components/header/Header";

function Dashboard() {
  return (
    <>
      <Header pageTitle={"Dashboard"} />
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
    </>
  );
}

export default Dashboard;
