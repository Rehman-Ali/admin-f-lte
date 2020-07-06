import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/config";
import {
  ALL_DONATIONPRODUCT_FAIL,
  ALL_DONATIONPRODUCT_SUCCESS,
  EDIT_DONATIONPRODUCT_SUCCESS,
} from "../../actions/types";
import { useAlert } from "react-alert";

const DonationProduct = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const alldonationProduct = useSelector(
    (state) => state.donationProduct.allDonationProduct
  );
  const dispatch = useDispatch();
  const [donationProductInfo, setDonationProductInfo] = useState("");
  const [donationProductIndex, setDonationProductIndex] = useState("");
  const [deleteDonationProduct, setDeleteDonationProduct] = useState(false);
  const alert = useAlert();

  console.log("array", alldonationProduct);

  useEffect(() => {
    fetch(`${SERVER_URL}api/donationProduct/`, {
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
          type: ALL_DONATIONPRODUCT_SUCCESS,
          payload: json.product,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_DONATIONPRODUCT_FAIL,
        });
      });
  }, [deleteDonationProduct]);

  const donationProductShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/donationProduct/product/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setDonationProductInfo(json.product[0]);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setDonationProductIndex(index);
  };

  const removeDonationProduct = (item) => {
    fetch(`${SERVER_URL}api/donationProduct/product/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        alert.success("donationProduct deleted successfully!");
        setDeleteDonationProduct(!deleteDonationProduct);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });
  };

  const editDonationProduct = (item) => {
    dispatch({
      type: EDIT_DONATIONPRODUCT_SUCCESS,
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
              All Donation Product
              <small>Details</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Donation Product</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-xs-12">
                <div className="box ">
                  <div className="box-header">
                    <h3 className="box-title">All Doantion Product</h3>
                    <Link
                      // type="submit"
                      className="btn btn-primary pull-right"
                      style={{ marginRight: "25px" }}
                      // onClick={(e) => onSubmit(e)}
                      to="/add-donation-product"
                    >
                      Add Product
                    </Link>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body scrolltbl">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Sr no</th>
                          <th>Name</th>
                          <th>Category</th>
                          {/* <th>Image</th>
                          <th>Amount</th>
                          <th>Created at</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alldonationProduct === null ||
                        alldonationProduct === undefined ||
                        alldonationProduct.length < 1
                          ? "no data exist"
                          : alldonationProduct !== null &&
                            alldonationProduct !== undefined &&
                            alldonationProduct.length > 0
                          ? alldonationProduct.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product_name}</td>
                                <td>{item.product_category}</td>
                                {/* <td>{item.image}</td>
                                <td>{item.amount}</td>
                                <td>{item.created_at}</td> */}
                                <td>
                                  <Link to="/edit-donation-product">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editDonationProduct(item)}
                                    ></i>
                                  </Link>
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
                        Category
                      </th>
                      {/* <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Image
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Amount
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Created at
                        </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {donationProductInfo !== "" &&
                    donationProductInfo !== null &&
                    donationProductInfo !== undefined ? (
                      <tr>
                        <td className="tr">
                          {donationProductInfo.product_name}
                        </td>
                        <td className="tr">
                          {donationProductInfo.product_category}
                        </td>
                        {/* <td className="tr">{causeInfo.image}</td>
                      <td className="tr">{causeInfo.amount}</td>
                          <td className="tr">{causeInfo.created_at}</td> */}
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

export default DonationProduct;
