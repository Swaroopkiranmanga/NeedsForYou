import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerCreate = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      "username": ref1.current.value,
      "email": ref2.current.value,
      "password": ref3.current.value,
      "phoneNumber": ref4.current.value,
      "role": ref5.current.value
    };
    console.log('User to be added:', newUser); // Add this log to check the new user details
    axios.post('http://localhost:8081/register', newUser)
      .then(response => {
        alert('User added successfully');
        navigate("/adminDashboard");
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert(`Error adding user: ${error.response.data}`); // Display the error message from the server
        } else {
          console.error('Error adding user:', error);
        }
      });
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Name:</label>
            <input type="text" name="username" className="form-control" placeholder="Enter username" ref={ref1} />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" ref={ref2} />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" ref={ref3} />
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input 
              type="text" 
              name="phoneNumber" 
              className="form-control" 
              placeholder="Enter phone number" 
              ref={ref4}
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number" 
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role">Role:</label>
            <select name="role" className="form-control" ref={ref5}>
              <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              <option value="ROLE_USER">ROLE_USER</option>
            </select>
          </div>
          <button className="btn btn-success" type='submit'>Submit</button>
          <Link to="/adminDashboard" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default CustomerCreate;