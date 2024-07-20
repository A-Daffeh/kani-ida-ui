import { Button } from "react-bootstrap";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  return (
    <>
      <Header pageTitle="Product Categories" />
      <span className="d-flex justify-content-end mb-2">
          <Link to="/new/product/category">
              <Button variant="light product-btn">Add Product Category</Button>{' '}
          </Link>
      </span>
      <table className="table">
          <thead>
          <tr className="header-border">
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
              <th scope="row">1</th>
              <td>Name</td>
              <td>Mark</td>
          </tr>
          <tr>
              <th scope="row">2</th>
              <td>Name</td>
              <td>Jacob</td>
          </tr>
          <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
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
  )
};

export default ProductCategory;
