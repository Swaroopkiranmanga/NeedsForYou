import './Login.css';
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate();
  
  const [error, setError] = useState(""); 

  const register = () => {
    navigate("/register");
  };

  const login = async () => {
    if(ref1.current && ref2.current){
      const username = ref1.current.value;
      const password = ref2.current.value;
      
      if(!username || !password){
        setError("Both fields are required.");
        return;
      }

      try {
        const res = await axios.post('http://localhost:8081/login', {
          "username": username,
          "password": password
        });

        const { data } = res;
        const { login } = data;

        if (login === "success") {
          const { role, token } = data;
          window.localStorage.setItem("token", token);

          if (role === "ROLE_USER") {
            navigate("/");
          } else {
            navigate("/admindashboard");
          }
        } else {
          setError("Invalid login credentials.");
        }
      } catch (error) {
        setError("An error occurred while logging in.");
        console.log("Error:", error);
      }
    } else {
      setError("Enter credentials.");
    }
  };

  return (
    <div className='login1'>
      <div id="login-right">
        <h1>Login</h1>
        <div className="login-right-content">
          <div className="input-wrapper">
            <label className="label1">Username</label>
            <div className="input-with-icon">
              <span className="input-icon">&#128100;</span>
              <input
                type="text"
                ref={ref1}
                placeholder="Enter your username"
                className="login-input"
              />
            </div>
          </div>
          <div className="input-wrapper">
            <label className="label1">Password</label>
            <div className="input-with-icon">
              <span className="input-icon">&#128274;</span>
              <input
                type="password"
                ref={ref2}
                placeholder="Enter your password"
                className="login-input"
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="login-button" onClick={login}><b>Login</b></button>
          <br /><br />
          <button className="login-button" onClick={register}><b>Register</b></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
