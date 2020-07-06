import { ALL_NEWS_FAIL, ALL_NEWS_SUCCESS , EDIT_NEWS_SUCCESS} from "../actions/types";

const initialState = {
  allNews: [],
  editNews:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_NEWS_SUCCESS:
      return {
        ...state,
        allNews: payload,
      };
    case ALL_NEWS_FAIL:
      return {
        ...state,
        allNews: [],
      };
      case EDIT_NEWS_SUCCESS:
        return {
          ...state,
          editNews:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
