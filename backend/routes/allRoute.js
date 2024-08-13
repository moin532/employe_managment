const express = require("express");
const Router = express.Router();

const { Register, Login, LoadUser } = require("../controllers/userController");
const {
  CreateEmploye,
  GetAllEmploye,
  updateEmployee,
  DeleteEmploye,
  getSingle,
} = require("../controllers/EmployeController");
Router.route("/register").post(Register);
Router.route("/login").post(Login);
Router.route("/me").get(LoadUser);

Router.route("/employe").post(CreateEmploye);
Router.route("/all/employe").get(GetAllEmploye);
Router.route("/update/:id").put(updateEmployee);
Router.route("/delete/:id").delete(DeleteEmploye);
Router.route("/single/:id").get(getSingle);

module.exports = Router;
