import React, { useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateEmploye from "./pages/CreateEmploye";
import AllEmployList from "./pages/AllEmployList";
import EditEmploye from "./pages/EditEmploye";
import { useDispatch, useSelector } from "react-redux";
import { LoadUserAction } from "./assets/AllAction";
import RegisterUser from "./pages/RegisterUser";

const App = () => {
  const Dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    Dispatch(LoadUserAction());
  }, [Dispatch]);
  return (
    <BrowserRouter>
      <Header userName={userData?.userName} />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create-employee" element={<CreateEmploye />}></Route>
        <Route path="/all-employee" element={<AllEmployList />}></Route>
        <Route path="/employe/:id" element={<EditEmploye />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
