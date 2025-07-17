import { useState, useEffect, useRef } from 'react';
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import { useFetchOrders, useUpdateOrderStatus } from '../services/OrderService';
import { showToast } from "../components/layouts/Toast";
import SearchBar from "../components/layouts/SearchBar";

const OrderedProduct = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusExpanded, setStatusExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { data, error, isLoading } = useFetchOrders(currentPage, pageSize);
  const { mutate: updateOrderStatus, error: updateError, isSuccess: updateSuccess } = useUpdateOrderStatus();

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setStatusExpanded(false);
  };

  const handleStatusClick = () => {
    setStatusExpanded(!statusExpanded);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setStatusExpanded(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({ orderId, status: newStatus });
    setActiveDropdown(null);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle toast messages
  useEffect(() => {
    if (error) {
      showToast('Failed to fetch orders', 'error');
    }
  }, [error]);

  useEffect(() => {
    if (updateSuccess) {
      showToast('Order status updated successfully', 'success');
    } else if (updateError) {
      showToast('Failed to update order status', 'error');
    }
  }, [updateSuccess, updateError]);

  const orders = data?.content || [];
  const totalPages = data?.totalPages || 1;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <>
      <Header pageTitle="Ordered Products" />
      <SearchBar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ordered Products</h2>
      </div>
      <table className="table">
        <thead>
          <tr className="header-border">
            <th scope="col">Order ID</th>
            <th scope="col">Order Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>#{order.orderNumber}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.customer}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{order.orderStatus}</td>
              <td style={{ position: 'relative' }}>
                <button
                  className="options-btn"
                  onClick={() => handleDropdownClick(index)}
                >
                  ...
                </button>
                {activeDropdown === index && (
                  <div className="dropdown-menu show" ref={dropdownRef}>
                    <div className="dropdown-header" onClick={handleStatusClick}>
                      <span>Status</span>
                      <span style={{ float: 'right', cursor: 'pointer' }}>
                        {statusExpanded ? '▲' : '▼'}
                      </span>
                    </div>
                    {statusExpanded && (
                      <div className="status-options">
                        <button
                          className="dropdown-item"
                          onClick={() => handleStatusChange(order.id, 'OUT_FOR_DELIVERY')}
                        >
                          On Delivery
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                        >
                          Delivered
                        </button>
                      </div>
                    )}
                    <button
                      className="dropdown-item"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      View Order
                    </button>
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
              <button className="page-link" onClick={() => handlePageClick(page)}>
                {page + 1}
              </button>
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

export default OrderedProduct;