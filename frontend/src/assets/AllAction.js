import axios from "axios";
const config = { headers: { "Content-Type": "application/json" } };
import Cookies from "js-cookie";
export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await axios.post(
      " http://localhost:400/api/v1/login",
      { userName, password },
      config
    );

    Cookies.set("Token", JSON.stringify(data.Token), {
      expires: 7,
      path: "/",
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.Token,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.content,
    });
  }
};

export const Register = (userName, password, email) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await axios.post(
      " http://localhost:400/api/v1/register",
      { userName, password, email },
      config
    );

    Cookies.set("Token", JSON.stringify(data.Token), {
      expires: 7,
      path: "/",
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.Token,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.msg,
    });
  }
};

export const EmployeAction = (loadData) => async (dispatch) => {
  try {
    dispatch({ type: "EMP_REQUEST" });

    const confige = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
      "http://localhost:400/api/v1/employe",
      loadData,
      confige
    );

    dispatch({
      type: "EMP_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "EMP_FAILURE",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "Something went wrong",
    });
  }
};

export const AllEmployeAction = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_EMP_REQ" });

    const { data } = await axios.get(
      "http://localhost:400/api/v1/all/employe",
      config
    );

    dispatch({
      type: "ALL_EMP_SUC",
      payload: data.emp,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "ALL_EMP_FAILURE",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "Something went wrong",
    });
  }
};

export const SingEmployeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SING_EMP_REQ" });

    const { data } = await axios.get(
      `http://localhost:400/api/v1/single/${id}`,
      config
    );

    dispatch({
      type: "SING_EMP_SUC",
      payload: data.emp,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "SING_EMP_FAILURE",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "Something went wrong",
    });
  }
};

export const UpdateAction = (id, loadData) => async (dispatch) => {
  try {
    dispatch({ type: "UPD_REQUEST" });

    const confige = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.put(
      `http://localhost:400/api/v1/update/${id}`,
      loadData,
      confige
    );

    dispatch({
      type: "UPD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "UPD_FAILURE",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "Something went wrong",
    });
  }
};

export const DeleteEmployeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DEL_EMP_REQ" });

    const { data } = await axios.delete(
      `http://localhost:400/api/v1/delete/${id}`,
      config
    );

    dispatch({
      type: "DEL_EMP_SUC",
      payload: data.emp,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "DEL_EMP_FAILURE",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "Something went wrong",
    });
  }
};

export const LoadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });

    const token = JSON.parse(Cookies.get("Token"));
    const confige = {
      headers: {
        authorization: `${token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:400/api/v1/me`, confige);

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : "Something went wrong",
    });
  }
};
