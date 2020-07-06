import React, { Fragment ,useState, useEffect} from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/config";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
} from "../../actions/types";
import { useAlert } from "react-alert";

const Product = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allProduct = useSelector(
    (state) => state.product.allProduct
  );
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState("");
  const [productIndex, setProductIndex] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(false);
  const alert = useAlert();

  

  useEffect(() => {
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
  }, [deleteProduct]);

  const productShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/product/product/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setProductInfo(json.product[0]);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setProductIndex(index);
  };

  const removeProduct = (item) => {
    fetch(`${SERVER_URL}api/product/product/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        alert.success("Product deleted successfully!");
        setDeleteProduct(!deleteProduct);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });
  };

  const editProduct = (item) => {
    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
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
              All Product
              <small>Details</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">product</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-xs-12">
                <div className="box ">
                  <div className="box-header">
                    <h3 className="box-title">All Product Detail</h3>
                    <Link
                      // type="submit"
                      className="btn btn-primary pull-right"
                       style={{marginRight: '25px'}}
                      // onClick={(e) => onSubmit(e)}
                      to="/add-product"
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
                      {allProduct.length < 1
                          ? "No data exist"
                          : allProduct !== null && allProduct.length > 0
                          ? allProduct.map((item, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.product_name}</td>
                            <td>{item.product_category}</td>
                                <td>
                                  <Link to="/edit-product">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editProduct(item)}
                                    ></i>
                                  </Link>
                                  <i
                                    className="fa fa-fw fa-eye"
                                    style={{ color: "#3c8dbc" }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    onClick={() =>
                                      productShowInModal(item, index + 1)
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-fw fa-remove"
                                    style={{ color: "red" }}
                                    onClick={() => removeProduct(item)}
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
                Product Detail
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
                  {productInfo !== "" &&
                          productInfo !== null &&
                          productInfo !== undefined ? (
                    <tr>
                      <td className="tr">{productInfo.product_name}</td>
                      <td className="tr">{productInfo.product_category}</td>
                      {/* <td className="tr">{causeInfo.image}</td>
                      <td className="tr">{causeInfo.amount}</td>
                          <td className="tr">{causeInfo.created_at}</td> */}

                       </tr>
                     ) : "no data exist with id"}
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

export default Product;
