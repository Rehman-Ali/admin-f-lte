import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import User from '../pages/User';
import Volunteer from '../pages/Volunteer';
import News from '../pages/News';
import Login from '../pages/Login';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import EditUser from '../pages/User/EditUser';
import EditNews from '../pages/News/EditNews';
import Compaign from '../pages/Compaign';
import EditCompaign from '../pages/Compaign/EditCompaign';
import Product from '../pages/Product';
import EditProduct from '../pages/Product/EditProduct';
import DonationProduct from '../pages/DonationProduct';
import EditDonationProduct from '../pages/DonationProduct/EditDonationProduct';
import AddNews from '../pages/News/AddNews';
import AddCompaign from '../pages/Compaign/AddCompaign';
import AddProduct from '../pages/Product/AddProduct';
import AddDonationProduct from '../pages/DonationProduct/AddDonationProduct';
import DonationRequest from '../pages/DonationRequest';
import EditDonationRequest from '../pages/DonationRequest/EditDonationRequest';
import AddDonationRequest from '../pages/DonationRequest/AddDonationRequest';
// set alert time and position
const options = {
  timeout: 3000,
  offset: '50px',
  position: positions.TOP_RIGHT
};


const Routes = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
    <Switch>
      <Route exact path='/login' component={Login} />

      <Route exact path='/' component={Home} />
      <Route exact path='/user' component={User} />
      <Route exact path='/volunteer' component={Volunteer} />
      <Route exact path='/news' component={News} />
      <Route exact path='/user-edit' component={EditUser} />
      <Route exact path='/news-edit' component={EditNews} />
      <Route exact path='/news-add' component={AddNews} />
      <Route exact path='/add-compaign' component={AddCompaign} />
      <Route exact path='/compaign' component={Compaign} />
      <Route exact path='/edit-compaign' component={EditCompaign} />
      <Route exact path='/add-product' component={AddProduct} />
      <Route exact path='/product' component={Product} />
      <Route exact path='/edit-product' component={EditProduct} />
      <Route exact path='/add-donation-product' component={AddDonationProduct} />
      <Route exact path='/donation-product' component={DonationProduct} />
      <Route exact path='/edit-donation-product' component={EditDonationProduct} />
      <Route exact path='/donation-request' component={DonationRequest} />
      <Route exact path='/edit-donation-request' component={EditDonationRequest} />
       <Route exact path='/add-donation-request' component={AddDonationRequest} />

     
     </Switch>
     </Provider>
  );
};

export default Routes;
