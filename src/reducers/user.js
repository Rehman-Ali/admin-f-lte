import { ALL_USER_FAIL, ALL_USER_SUCCESS , EDIT_USER_SUCCESS} from "../actions/types";

const initialState = {
  allUser: [],
  editUser:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_USER_SUCCESS:
      return {
        ...state,
        allUser: payload,
      };
    case ALL_USER_FAIL:
      return {
        ...state,
        allUser: [],
      };
      case EDIT_USER_SUCCESS:
        return {
          ...state,
          editUser:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
