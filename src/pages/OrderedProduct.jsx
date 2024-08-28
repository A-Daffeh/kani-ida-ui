import React, { useState, useEffect, useRef } from 'react';
import Header from "../components/header/Header";
import SearchBar from "../components/layouts/SearchBar";

const OrderedProduct = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusExpanded, setStatusExpanded] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <th scope="col">Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Location</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#5522351", date: "July 1st 2024, 9:37 AM", customer: "Mustapha Samura", location: "1216 126th St SE Everett, WA 98208", amount: "$164.52", status: "New Order" },
            { id: "#5532030", date: "July 1st 2024, 11:23 AM", customer: "Modoulamin Sanneh", location: "1216 126th St SE Everett, WA 98208", amount: "$32.58", status: "On Delivery" },
            { id: "#5383201", date: "July 2nd 2024, 7:42 AM", customer: "Bakary Jammeh", location: "1216 126th St SE Everett, WA 98208", amount: "$43.32", status: "On Delivery" },
            { id: "#5383201", date: "July 3rd 2024, 11:25 AM", customer: "Ebrima Darboe", location: "1216 126th St SE Everett, WA 98208", amount: "$12.22", status: "Delivered" },
            // Repeat similar rows for other orders
          ].map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.customer}</td>
              <td>{order.location}</td>
              <td>{order.amount}</td>
              <td><span className={`status-badge ${order.status.replace(/\s+/g, '-').toLowerCase()}`}>{order.status}</span></td>
              <td style={{ position: 'relative' }}>
                <button className="options-btn" onClick={() => handleDropdownClick(index)}>...</button>
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
                        <button className="dropdown-item">New Order</button>
                        <button className="dropdown-item">On Delivery</button>
                        <button className="dropdown-item">Delivered</button>
                      </div>
                    )}
                    <button className="dropdown-item">View Order</button>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                      <input type="checkbox" id={`delete-${index}`} />
                      <label htmlFor={`delete-${index}`} style={{ marginLeft: '5px' }}>Delete Order</label>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-custom">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
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

