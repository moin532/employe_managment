import React from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ userName }) => {
  const Navigate = useNavigate();
  const logout = () => {
    Navigate("/");
    Cookies.remove("Token");
    // window.alert("logout - sucess");
  };

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="path_to_logo" alt="Logo" />
        </div>
        {userName && userName ? (
          <>
            <ul className="navbar-links">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/all-employee">Employee List</a>
              </li>
              <li>
                <a href="/create-employee">Create Employee</a>
              </li>
            </ul>
            <div className="navbar-user">
              <span>{userName ? userName : ""}</span>
              <a className="navbar-logout" onClick={logout}>
                Logout
              </a>
            </div>
          </>
        ) : (
          ""
        )}
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* Navbar container */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f1f1f1;
    border-bottom: 2px solid #ccc;
  }

  /* Logo styling */
  .navbar-logo img {
    height: 40px;
  }

  /* Navigation links styling */
  .navbar-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  .navbar-links li {
    margin: 0;
  }

  .navbar-links a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .navbar-links a:hover {
    color: #007bff;
  }

  /* User information and logout styling */
  .navbar-user {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .navbar-user span {
    font-weight: bold;
    color: #333;
  }

  .navbar-logout {
    text-decoration: none;
    color: #dc3545;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .navbar-logout:hover {
    color: #c82333;
    cursor: pointer;
  }
`;

export default Header;
