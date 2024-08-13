import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../assets/AllAction";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/home");
    }

    if (error) {
      window.alert(error);
    }
  }, [isAuthenticated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Register(name, password, email));
  };

  return (
    <Wrapper>
      <div>
        <div className="auth-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="password">Email:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-submit-button">
              Login
            </button>
          </form>

          <p>
            Already have a account: <a href="/">Login</a>{" "}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .auth-container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .auth-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
  }

  .auth-form-group {
    margin-bottom: 15px;
  }

  .auth-form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .auth-form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .auth-submit-button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2cad43;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .auth-submit-button:hover {
    background-color: #0056b3;
  }
`;
export default RegisterUser;
