import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import news from './news';

import compaign from './compaign';
import donationProduct from './donationProduct';
import donationRequest from './donationRequest';
import product from './product';
export default combineReducers({
    auth,
    user,
    news,
    compaign,
    donationProduct,
    product,
    donationRequest
    
   
});




