import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS , EDIT_PRODUCT_SUCCESS} from "../actions/types";

const initialState = {
  allProduct: [],
  editProduct:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        allProduct: payload,
      };
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        allProduct: [],
      };
      case EDIT_PRODUCT_SUCCESS:
        return {
          ...state,
          editProduct:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
