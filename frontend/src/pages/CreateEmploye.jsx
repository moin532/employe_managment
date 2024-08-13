import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { EmployeAction } from "../assets/AllAction";
import { useNavigate } from "react-router-dom";
const CreateEmploye = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.emp);

  useEffect(() => {
    if (success) {
      window.alert("created Successfully");
      Navigate("/all-employee");
    }

    if (error) {
      window.alert(error);
    }
  }, [success, error]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    MCA: false,
    BCA: false,
    BSC: false,
  });

  const [file, setFile] = useState(null);
  const validate = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!number) errors.number = "Mobile number is required";
    if (!gender) errors.gender = "Gender is required";
    if (!Object.values(course).some(Boolean))
      errors.course = "At least one course must be selected";
    // if (image && !["image/jpeg", "image/png"].includes(image.type))
    //   errors.image = "Only jpg/png files are allowed";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.set("Name", name);
    formData.set("Email", email);
    formData.set("Mobile", number);
    formData.set("Designation", designation);
    formData.set("Gender", gender);

    const selectedCourse = Object.keys(course).find((key) => course[key]);

    formData.set("Course", selectedCourse);
    formData.append("image", file);

    dispatch(EmployeAction(formData));
  };

  return (
    <Wrapper>
      <div className="create-employee-container">
        <div className="create-employee-header">Create Employee</div>
        <form onSubmit={handleSubmit} className="create-employee-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile No:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <select
              id="designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="">Select a designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={gender === "M"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={gender === "F"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div className="form-group">
            <label>Course:</label>
            <label>
              <input
                type="checkbox"
                name="MCA"
                checked={course.MCA}
                onChange={handleChange}
              />
              MCA
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="BCA"
                checked={course.BCA}
                onChange={handleChange}
              />
              BCA
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="BSC"
                checked={course.BSC}
                onChange={handleChange}
              />
              BSC
            </label>
            {errors.course && <p className="error">{errors.course}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="image">Image Upload:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .create-employee-container {
    width: 100%;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .create-employee-header {
    background-color: yellow;
    padding: 10px;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .create-employee-form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="file"],
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-group input[type="radio"],
  .form-group input[type="checkbox"] {
    margin-right: 10px;
  }

  .submit-button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background-color: #218838;
  }

  .error {
    color: red;
    font-size: 12px;
  }
`;
export default CreateEmploye;
