import Header from "../components/header/Header";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
const ProductCategory = () => {
    const navigate = useNavigate();
  return (

    <>
    
      <div className="container">
        <Header pageTitle="Product Category" />
        <h2>Product Categories</h2>
        <span className="d-flex justify-content-end mb-2">
            
          <Link className="forgot-password mb-0" to="/Add-new-product">
          <Button variant="light product-btn">Add new Product</Button>{' '}
          </Link>
        </span>
        <table class="table">
          <thead>
            <tr className="header-border">
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Availability</th>
              <th scope="col">Quantity</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>spice</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>spice</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
              <td>spice</td>
            </tr>

            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-custom">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductCategory;
