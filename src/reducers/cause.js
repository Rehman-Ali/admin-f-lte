import { ALL_CAUSE_FAIL,ALL_CAUSE_SUCCESS, EDIT_CAUSE_SUCCESS} from "../actions/types";

const initialState = {
  allCause: [],
  editCause:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_CAUSE_SUCCESS:
      return {
        ...state,
        allCause: payload,
      };
    case ALL_CAUSE_FAIL:
      return {
        ...state,
        allCause: [],
      };
      case EDIT_CAUSE_SUCCESS:
        return {
          ...state,
          editCause:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
