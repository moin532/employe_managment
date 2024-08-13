import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadUserAction } from "../assets/AllAction";

const Home = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    Dispatch(LoadUserAction());
  }, [Dispatch]);
  return (
    <Wrapper>
      <div>
        <div className="container">
          <div className="header">DashBord</div>
          <div className="content">Welcome Admin Panel</div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #f8f9fa;
  }

  .header {
    width: 100%;
    padding: 20px;
    background-color: yellow;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
  }

  .content {
    margin-top: 50px;
    font-size: 28px;
    color: #333;
    text-align: center;
  }
`;
export default Home;
