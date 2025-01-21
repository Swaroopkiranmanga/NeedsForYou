import { useRef, useState } from "react";
import axios from "axios";
import './Register.css';

const Register = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [mobileMessage, setMobileMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const clearInputs = () => {
    ref1.current.value = "";
    ref2.current.value = "";
    ref3.current.value = "";
    ref4.current.value = "";
  };


  const register = async () => {
    const password = ref2.current.value;
    if (!validatePassword(password)) {
      setPasswordMessage("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/register", {
        "username": ref1.current.value,
        "password": password,
        "email": ref3.current.value,
        "mobilenumber": ref4.current.value,
        "role": "ROLE_USER"
      });
      const { data } = res;
      if (data) {

        setUsernameMessage("");
        setPasswordMessage("");
        setEmailMessage("");
        setMobileMessage("");
        clearInputs();
        setSuccessMessage("Registration Successful!");
      } else {
        setSuccessMessage("Registration Failed.");
      }
    } catch (error) {
      const { data } = error.response;
      if (data === `Username already exists: ${ref1.current.value}`) {
        setUsernameMessage(`${ref1.current.value} already exists. Please choose another username.`);
      } else if (data === `Email already exists: ${ref3.current.value}`) {
        setEmailMessage("Email already exists. Please choose another email.");
      }
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-box">
          <h1>Register</h1>
          <div className="register-content">
            <label>Username</label>
            <div className="input-with-icon1">
              <span className="icon">👤</span>
              <input type="text" ref={ref1} placeholder="Enter your username" />
            </div>
            {usernameMessage && <p className="error-message">{usernameMessage}</p>}

            <label>Password</label>
            <div className="input-with-icon1">
              <span className="icon">🔒</span>
              <input type="password" ref={ref2} placeholder="Enter your password" />
            </div>
            {passwordMessage && <p className="error-message">{passwordMessage}</p>}

            <label>Email</label>
            <div className="input-with-icon1">
              <span className="icon">✉️</span>
              <input type="email" ref={ref3} placeholder="Enter your email" />
            </div>
            {emailMessage && <p className="error-message">{emailMessage}</p>}

            <label>Mobile Number</label>
            <div className="input-with-icon1">
              <span className="icon">📱</span>
              <input type="tel" ref={ref4} placeholder="Enter your mobile number" />
            </div>
            {mobileMessage && <p className="error-message1">{mobileMessage}</p>}

            <button className="register-button" onClick={register}>Register</button>
            {successMessage && <p className="success-message1">{successMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
