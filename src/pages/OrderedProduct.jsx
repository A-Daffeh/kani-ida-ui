import Header from "../components/header/Header";

const OrderedProduct = () => {
  return (
    <>
      <Header pageTitle="Ordered Products" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ordered Products</h2>
        
      </div>
      <table className="table">
        <thead>
          <tr className="header-border">
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Location</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#5522351</td>
            <td>July 1st 2024, 9:37 AM</td>
            <td>Mustapha Samura</td>
            <td>1216 126th St SE Everett, WA 98208</td>
            <td>$164.52</td>
            <td><span className="status-badge new-order">New Order</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>#5532030</td>
            <td>July 1st 2024, 11:23 AM</td>
            <td>Modoulamin Sanneh</td>
            <td>1216 126th St SE Everett, WA 98208</td>
            <td>$32.58</td>
            <td><span className="status-badge on-delivery">On Delivery</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>#5383201</td>
            <td>July 2nd 2024, 7:42 AM</td>
            <td>Bakary Jammeh</td>
            <td>1216 126th St SE Everett, WA 98208</td>
            <td>$43.32</td>
            <td><span className="status-badge on-delivery">On Delivery</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          <tr>
            <td>#5383201</td>
            <td>July 3rd 2024, 11:25 AM</td>
            <td>Ebrima Darboe</td>
            <td>1216 126th St SE Everett, WA 98208</td>
            <td>$12.22</td>
            <td><span className="status-badge delivered">Delivered</span></td>
            <td><button className="options-btn">...</button></td>
          </tr>
          {/* Repeat similar rows for other orders */}
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

export default OrderedProduct;
