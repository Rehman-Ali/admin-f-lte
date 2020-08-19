import { ALL_VOlUNTEER_FAIL, ALL_VOlUNTEER_SUCCESS , EDIT_VOlUNTEER_SUCCESS} from "../actions/types";

const initialState = {
  allVolunteer: [],
  editVolunteer:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_VOlUNTEER_SUCCESS:
      return {
        ...state,
        allVolunteer: payload,
      };
    case ALL_VOlUNTEER_FAIL:
      return {
        ...state,
        allVolunteer: [],
      };
      case EDIT_VOlUNTEER_SUCCESS:
        return {
          ...state,
          editVolunteer:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
