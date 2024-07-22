import Header from "../components/header/Header";

const UserManagement = () => {
  return (
    <>
      <Header pageTitle="User Management" />
      <h2>User Management</h2>
      <table className="table">
        <thead>
          
          <tr className="header-border">
            <th scope="col">Full Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Joined</th>
            <th scope="col">Status</th>
            <th scope="col">Permissions</th>
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
  );
};

export default UserManagement;
