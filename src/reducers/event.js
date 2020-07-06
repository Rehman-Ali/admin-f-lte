import { ALL_EVENTS_FAIL,ALL_EVENTS_SUCCESS, EDIT_EVENT_SUCCESS} from "../actions/types";

const initialState = {
  allEvent: [],
  editEvent:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvent: payload,
      };
    case ALL_EVENTS_FAIL:
      return {
        ...state,
        allEvent: [],
      };
      case EDIT_EVENT_SUCCESS:
        return {
          ...state,
          editEvent:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
