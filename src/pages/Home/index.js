import React, { Fragment , useEffect} from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {ALL_DONATIONPRODUCT_REQUEST_SUCCESS,ALL_DONATIONPRODUCT_REQUEST_FAIL, ALL_USER_SUCCESS, 
  ALL_USER_FAIL, ALL_VOlUNTEER_SUCCESS, ALL_VOlUNTEER_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL} from '../../actions/types';
import {SERVER_URL} from '../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
const Home = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user')
  const allProduct = useSelector(
    (state) => state.product.allProduct
  );
  const alldonationProductRequest = useSelector(
    (state) => state.donationRequest.allDonationRequest
  );
  const allVolunteer = useSelector((state) => state.volunteer.allVolunteer);

  const alluser = useSelector((state) => state.user.allUser);

  useEffect(() =>{
    
    // all donation request
    fetch(`${SERVER_URL}api/donationRequest/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ALL_DONATIONPRODUCT_REQUEST_SUCCESS,
          payload: json.donationRequest,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_DONATIONPRODUCT_REQUEST_FAIL,
        });
      });
    // all user
    fetch(`${SERVER_URL}api/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ALL_USER_SUCCESS,
          payload: json.user,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_USER_FAIL,
        });
      });

    // all volunteer
    fetch(`${SERVER_URL}api/volunteer/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ALL_VOlUNTEER_SUCCESS,
          payload: json.volunteer,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_VOlUNTEER_FAIL,
        });
      });
   
    // all product 
    fetch(`${SERVER_URL}api/product/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: json.product,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_PRODUCT_FAIL,
        });
      });

  }, [])





  return (
    <Fragment>
      <div className="wrapper">
        <Header />
        <SideNav />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Dashboard</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-lg-6 col-xs-6">
                {/* small box */}
                <div className="small-box bg-aqua">
                  <div className="inner">
                      <h3>{allProduct !== undefined && allProduct !== null && allProduct.length > 0 ? allProduct.length : 0}</h3>
                    <p>Total Products</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-6 col-xs-6">
                {/* small box */}
                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>
                    {alldonationProductRequest !== undefined && alldonationProductRequest !== null && alldonationProductRequest.length > 0 ? alldonationProductRequest.length : 0}
                    </h3>
                    <p>Total Request</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-6 col-xs-6">
                {/* small box */}
                <div className="small-box bg-yellow">
                  <div className="inner">
                    <h3>{ alluser !== undefined && alluser !== null && alluser.length > 0 ? alluser.length : 0}</h3>
                    <p>User Registrations</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-6 col-xs-6">
                {/* small box */}
                <div className="small-box bg-red">
                  <div className="inner">
                    <h3>{ allVolunteer !== undefined && allVolunteer !== null && allVolunteer.length > 0 ? allVolunteer.length : 0}</h3>
                    <p>Volunteers</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
            </div>
          </section>
        </div>
        <Footer />
        <div className="control-sidebar-bg" />
      </div>
      {/* ./wrapper */}
    </Fragment>
  );
};

export default Home;
