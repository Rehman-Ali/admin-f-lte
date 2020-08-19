import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/config";
import {
  ALL_DONATIONPRODUCT_REQUEST_FAIL,
  ALL_DONATIONPRODUCT_REQUEST_SUCCESS,
  EDIT_DONATIONPRODUCT_REQUEST_SUCCESS,
} from "../../actions/types";
import { useAlert } from "react-alert";

const DonationRequest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const alldonationProductRequest = useSelector(
    (state) => state.donationRequest.allDonationRequest
  );
  const dispatch = useDispatch();
  const [donationProductInfo, setDonationProductInfo] = useState("");
  const [donationProductIndex, setDonationProductIndex] = useState("");
  const [deleteDonationProduct, setDeleteDonationProduct] = useState(false);
  const alert = useAlert();

 
  useEffect(() => {
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
  }, [deleteDonationProduct]);

  const donationProductShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/donationRequest/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setDonationProductInfo(json.donationRequest[0]);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setDonationProductIndex(index);
  };

  const removeDonationProduct = (item) => {
    fetch(`${SERVER_URL}api/donationRequest/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        alert.success("donation Request deleted successfully!");
        setDeleteDonationProduct(!deleteDonationProduct);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });
  };

  const editDonationProduct = (item) => {
    dispatch({
      type: EDIT_DONATIONPRODUCT_REQUEST_SUCCESS,
      payload: item,
    });
  };

  return (
    <Fragment>
      <div className="wrapper">
        <Header />
        <SideNav />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              All Donation Request
              <small>Details</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Donation Request</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-xs-12">
                <div className="box ">
                  <div className="box-header">
                    <h3 className="box-title">All Donation Request </h3>
                    {/* <Link
                      // type="submit"
                      className="btn btn-primary pull-right"
                      style={{ marginRight: "25px" }}
                      // onClick={(e) => onSubmit(e)}
                      to="/add-donation-product"
                    >
                      Add Product
                    </Link> */}
                  </div>
                  {/* /.box-header */}
                  <div className="box-body scrolltbl">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                           <th>ID</th>
                          <th>Full Name</th>
                          <th>Phone no</th>
                          <th>Address</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alldonationProductRequest === null ||
                        alldonationProductRequest === undefined ||
                        alldonationProductRequest.length < 1
                          ? "no data exist"
                          : alldonationProductRequest !== null &&
                          alldonationProductRequest !== undefined &&
                          alldonationProductRequest.length > 0
                          ? alldonationProductRequest.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.description}</td>
                                {/* <td>{item.image}</td>
                                <td>{item.amount}</td>
                                <td>{item.created_at}</td> */}
                                <td>
                                  {/* <Link to="/edit-donation-product">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editDonationProduct(item)}
                                    ></i>
                                  </Link> */}
                                  <i
                                    className="fa fa-fw fa-eye"
                                    style={{ color: "#3c8dbc" }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    onClick={() =>
                                      donationProductShowInModal(
                                        item,
                                        index + 1
                                      )
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-fw fa-remove"
                                    style={{ color: "red" }}
                                    onClick={() => removeDonationProduct(item)}
                                  ></i>
                                </td>
                              </tr>
                            ))
                          : "Loading..."}
                      </tbody>
                    </table>
                  </div>
                  {/* /.box-body */}
                </div>
              </div>
              {/* /.col */}
            </div>
          </section>
        </div>
        <Footer />
        <div className="control-sidebar-bg" />
      </div>

      {/* for modal */}
      <div className="modal fade" id="modal-default">
        <div className="modal-dialog" style={{ marginTop: "10%" }}>
          <div
            className="modal-content"
            style={{ borderRadius: "5px", border: "1px solid white" }}
          >
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4
                className="modal-title"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Donation Product Detail
              </h4>
            </div>
            <div className="modal-body">
              <div className="box-body scrolltbl">
                <table
                  id="example1"
                  className="table table-bordered table-striped tbl table-hover"
                >
                  <thead>
                    <tr>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        Name
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        phone
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       address
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       city
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       state
                        </th>
                        <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Country
                        </th><th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Description
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donationProductInfo !== "" &&
                    donationProductInfo !== null &&
                    donationProductInfo !== undefined ? (
                      <tr>
                        <td className="tr">
                          {donationProductInfo.name}
                        </td>
                        <td className="tr">
                          {donationProductInfo.phone}
                        </td>
                        <td className="tr">{donationProductInfo.address}</td>
                      <td className="tr">{donationProductInfo.city}</td>
                          <td className="tr">{donationProductInfo.state}</td>
                          <td className="tr">{donationProductInfo.country}</td>
                          <td className="tr">{donationProductInfo.description}</td>
                      </tr>
                    ) : (
                      "no data exist with id"
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* ./wrapper */}
    </Fragment>
  );
};

export default DonationRequest;
