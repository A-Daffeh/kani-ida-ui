import Header from "../header/Header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Product = () => {

    return (
        <>
            <Header pageTitle="Products" />
            <span className="d-flex justify-content-end mb-2">
                <Link to="/new/product">
                    <Button variant="light product-btn">Add new Product</Button>{' '}
                </Link>
            </span>
            <table className="table">
                <thead>
                <tr className="header-border">
                    <th scope="col">#</th>
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
                    <td>Name</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>spice</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Name</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>spice</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>spice</td>
                    <td></td>
                    <td></td>
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
}

export default Product