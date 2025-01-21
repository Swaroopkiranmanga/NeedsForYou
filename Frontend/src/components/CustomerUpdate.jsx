import { useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerUpdate = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    axios.get(`http://localhost:8081/finduser/${id}`)
      .then(response => {
        console.log(removeEventListener.data)
        const user = response.data;
        // Populate form fields with user data
        ref1.current.value = user.username;
        ref2.current.value = user.email;
        ref3.current.value = user.password;
        ref4.current.value = user.phoneNumber;
        ref5.current.value = user.role;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8081/updateuser`, {
      id: id,
      username: ref1.current.value,
      email: ref2.current.value,
      password: ref3.current.value,
      phoneNumber: ref4.current.value,
      role: ref5.current.value
    })
    .then(response => {
      console.log(response);
      navigate("/adminDashboard");
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Name:</label>
            <input type="text" name="username" className="form-control" placeholder={ref1} ref={ref1} />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-control" placeholder={ref2} ref={ref2} />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" ref={ref3} />
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" name="phoneNumber" className="form-control" placeholder="Enter phone number" ref={ref4} />
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

export default CustomerUpdate;