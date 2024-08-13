const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  userData: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
    case "LOAD_USER_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };

    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        loading: false,
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
    case "LOAD_USER_FAILURE":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const initialState1 = {
  success: false,
  loading: false,
  error: null,
  allEmp: null,
  singleEmp: null,
  updSucees: false,
};

export const EmployeReducer = (state = initialState1, action) => {
  switch (action.type) {
    case "EMP_REQUEST":
    case "UPD_REQUEST":
      return { ...state, loading: true };

    case "EMP_SUCCESS":
      return {
        ...state,
        success: true,
        loading: false,
        error: null, // Ensure error is cleared on success
      };

    case "UPD_SUCCESS":
      return {
        ...state,
        updSucees: true,
        loading: false,
        error: null, // Ensure error is cleared on success
      };

    case "EMP_FAILURE":
    case "UPD_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

export const gettAllEmploye = (state = initialState1, action) => {
  switch (action.type) {
    case "ALL_EMP_REQ":
    case "SING_EMP_REQ":
    case "DEL_EMP_REQ":
      return { ...state, loading: true };

    case "ALL_EMP_SUC":
    case "DEL_EMP_SUC":
      return {
        ...state,
        success: true,
        loading: false,
        allEmp: action.payload,
      };

    case "SING_EMP_SUC":
      return {
        ...state,
        success: true,
        loading: false,
        singleEmp: action.payload,
      };

    case "ALL_EMP_FAILURE":
    case "DEL_EMP_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};
