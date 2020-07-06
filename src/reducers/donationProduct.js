import { ALL_DONATIONPRODUCT_FAIL, ALL_DONATIONPRODUCT_SUCCESS , EDIT_DONATIONPRODUCT_SUCCESS} from "../actions/types";

const initialState = {
  allDonationProduct: [],
  editDonationProduct:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_DONATIONPRODUCT_SUCCESS:
      return {
        ...state,
        allDonationProduct: payload,
      };
    case ALL_DONATIONPRODUCT_FAIL:
      return {
        ...state,
        allDonationProduct: [],
      };
      case EDIT_DONATIONPRODUCT_SUCCESS:
        return {
          ...state,
          editDonationProduct:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
