import { useState, useEffect, useRef } from 'react';
import Header from "../components/header/Header";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SearchBar from "../components/layouts/SearchBar";
import { useFetchUsers, useUpdateUserRole } from '../services/UserService';
import { showToast } from "../components/layouts/Toast";

const UserManagement = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [permissionsExpanded, setPermissionsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const { mutate: updateUserRole } = useUpdateUserRole();

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; 

  const { data, error, isLoading } = useFetchUsers(currentPage, pageSize);

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setPermissionsExpanded(false);
  };

  const handlePermissionsClick = () => {
    setPermissionsExpanded(!permissionsExpanded);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setPermissionsExpanded(false);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    updateUserRole({ userId, role: newRole }, {
      onSuccess: () => {
        showToast(`User role updated to ${newRole === 'ROLE_ADMIN' ? 'Admin' : 'User'}`, 'success');
      },
      onError: (error) => {
        showToast(`Failed to update user role: ${error.message}`, 'error');
      }
    });
    setActiveDropdown(null);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const users = data?.content || [];
  const totalPages = data?.totalPages || 1;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    showToast("Failed to fetch users", "error");
    return <div>Error fetching users</div>;
  }

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
            <th scope="col">Email</th>
            <th scope="col">Joined</th>
            <th scope="col">Status</th>
            <th scope="col">Role</th> {/* Changed from Permissions to Role */}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.isEnabled ? "Active" : "Inactive"}</td>
              <td><span className={`badge badge-${user.role.name.toLowerCase()}`}>{user.role.name}</span></td> {/* Updated for role */}
              <td style={{ position: 'relative' }}>
                <button className="options-btn" onClick={() => handleDropdownClick(index)}>...</button>
                {activeDropdown === index && (
                  <div className="dropdown-menu show" ref={dropdownRef}>
                    <div className="dropdown-header" onClick={handlePermissionsClick}>
                      <span>Permissions</span> 
                      <span style={{ float: 'right', cursor: 'pointer' }}>
                        {permissionsExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                    {permissionsExpanded && (
                      <div className="permissions-options">
                        <button className="dropdown-item" onClick={() => handleRoleChange(user.id, 'ROLE_ADMIN')}>Admin</button>
                        <button className="dropdown-item" onClick={() => handleRoleChange(user.id, 'ROLE_CUSTOMER')}>User</button>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                      <input type="checkbox" id={`delete-${index}`} />
                      <label htmlFor={`delete-${index}`} style={{ marginLeft: '5px' }}>Delete User</label>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-custom">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageClick(page)}>{page + 1}</button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserManagement;