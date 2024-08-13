import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AllEmployeAction, DeleteEmployeAction } from "../assets/AllAction";
import { useNavigate } from "react-router-dom";

const AllEmployList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allEmp, loading } = useSelector((state) => state.allEmp);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(AllEmployeAction());
  }, [dispatch]);

  const filteredEmployees = allEmp?.filter((emp) => {
    const name = emp.Name ? emp.Name.toLowerCase() : "";
    const email = emp.Email ? emp.Email.toLowerCase() : "";
    const mobile = emp.Mobile ? emp.Mobile : "";
    const designation = emp.Designation ? emp.Designation.toLowerCase() : "";
    const gender = emp.Gender ? emp.Gender.toLowerCase() : "";
    const course = emp.Course ? emp.Course.toLowerCase() : "";
    const createDate = emp.Createdate ? emp.Createdate.toLowerCase() : "";

    const searchTerm = search.toLowerCase();

    return (
      name.includes(searchTerm) ||
      email.includes(searchTerm) ||
      mobile.includes(searchTerm) ||
      designation.includes(searchTerm) ||
      gender.includes(searchTerm) ||
      course.includes(searchTerm) ||
      createDate.includes(searchTerm)
    );
  });

  const EditHandler = (id) => {
    navigate(`/employe/${id}`);
  };

  const DeleteHandler = (id) => {
    dispatch(DeleteEmployeAction(id));
  };

  const HandleNavigate = () => {
    navigate("/create-employee");
  };
  return (
    <Wrapper>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <Header>
            <div>Total Count: {filteredEmployees?.length}</div>
            <button onClick={HandleNavigate}>Create Employee</button>
            <input
              type="text"
              placeholder="Enter Search Keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Header>
          <Table>
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees?.map((emp, index) => (
                <tr key={index}>
                  <td>{emp._id}</td>
                  <td>
                    <img
                      src={`http://localhost:400${emp.Image}`}
                      alt="Uploaded"
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td>{emp.Name}</td>
                  <td>
                    <a href={`mailto:${emp.Email}`}>{emp.Email}</a>
                  </td>
                  <td>{emp.Mobile}</td>
                  <td>{emp.Designation}</td>
                  <td>{emp.Gender}</td>
                  <td>{emp.Course}</td>
                  <td>{emp.Createdate}</td>
                  <td>
                    <button
                      onClick={() => {
                        EditHandler(emp._id);
                      }}
                    >
                      Edit
                    </button>{" "}
                    -{" "}
                    <button
                      onClick={() => {
                        DeleteHandler(emp._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  .loading {
    text-align: center;
    font-size: 24px;
    margin-top: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  input {
    padding: 10px;
    width: 200px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  img {
    width: 50px;
    height: 50px;
  }

  button {
    background-color: transparent;
    color: blue;
    border: none;
    cursor: pointer;
  }
`;

export default AllEmployList;
