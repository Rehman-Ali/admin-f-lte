import { ALL_DONATIONREQUEST_FAIL, ALL_DONATIONREQUEST_SUCCESS , EDIT_DONATIONREQUEST_SUCCESS} from "../actions/types";

const initialState = {
  allDonationRequest: [],
  editDonationRequest:[]
  
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_DONATIONREQUEST_SUCCESS:
      return {
        ...state,
        allDonationRequest: payload,
      };
    case ALL_DONATIONREQUEST_FAIL:
      return {
        ...state,
        allDonationRequest: [],
      };
      case EDIT_DONATIONREQUEST_SUCCESS:
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
