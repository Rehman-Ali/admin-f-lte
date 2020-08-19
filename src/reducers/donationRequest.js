import { ALL_DONATIONPRODUCT_REQUEST_FAIL,
  ALL_DONATIONPRODUCT_REQUEST_SUCCESS,
  EDIT_DONATIONPRODUCT_REQUEST_SUCCESS} from "../actions/types";

const initialState = {
  allDonationRequest: [],
  editDonationRequest:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_DONATIONPRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        allDonationRequest: payload,
      };
    case ALL_DONATIONPRODUCT_REQUEST_FAIL:
      return {
        ...state,
        allDonationRequest: [],
      };
      case EDIT_DONATIONPRODUCT_REQUEST_SUCCESS:
        return {
          ...state,
          editDonationRequest:[payload] 
        };
       
    default:
      return {
        ...state,
      };
  }
}
