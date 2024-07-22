import Header from "../components/header/Header"

const OrderedProduct = () => {
    return (
        <>
      <Header pageTitle="Ordered Products" />
      <h2>Ordered Products</h2>
      <table className="table">
        <thead>
          
          <tr className="header-border">
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Location</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>

          <tr>
          
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <tr>
           
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>
          <tr>
       
            <td> Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <tr>
       
            <td> Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <tr>
       
            <td> Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <tr>
       
            <td> Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <tr>
       
            <td> Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <tr>
       
            <td> Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>...</td>
          </tr>

          <td>Mark</td>
            <td>Otto</td>
            <td>...</td>

    
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

export default OrderedProduct