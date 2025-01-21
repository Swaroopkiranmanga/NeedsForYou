import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons
import './Customer.css';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages state
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = (page) => {
    axios.get(`http://localhost:8081/finduser?page=${page}`)
      .then(response => {
        setUsers(response.data.content); // Assuming the response contains a 'content' field with users
        setTotalPages(response.data.totalPages); // Assuming the response contains 'totalPages'
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:8081/delete/${id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='container'>
      <h2 className='page-title'>List of Users</h2>
      <div className='d-flex justify-content-end'>
        <Link to="/customercreate" className='btn btn-success add-btn'>+ Add</Link>
      </div>
      <div className='table-container'>
        <table className='table table-striped'>
          <thead className='head'>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>PhoneNumber</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className='body'>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td>
                  <FaEdit
                    className='icon update-icon'
                    onClick={() => navigate(`/customerupdate/${user.id}`)}
                    title="Edit"
                  />
                </td>
                <td>
                  <FaTrashAlt
                    className='icon delete-icon'
                    onClick={() => handleDelete(user.id)}
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-wrapper'>
        {totalPages > 1 && (
          <div className='pagination'>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} className={currentPage === index ? "active" : ""} onClick={() => handlePageChange(index)}>
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next</button>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default Customers;