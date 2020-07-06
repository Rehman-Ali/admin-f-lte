import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
  message: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        message: payload.message,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: "",
        isAuthenticated: false,
        message: payload,
      };
    case LOGOUT:
     localStorage.removeItem('user');
     localStorage.removeItem('role') ;
     localStorage.removeItem('tender_data')
     return {
        user: null,
        isAuthenticated: false,
        error: "",
        message: "",
      };
    default:
      return {
        ...state,
      };
  }
}
