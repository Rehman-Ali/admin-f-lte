import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/config";
import { ALL_USER_FAIL, ALL_USER_SUCCESS, EDIT_USER_SUCCESS } from "../../actions/types";
import { useAlert } from "react-alert";
const User = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const alluser = useSelector((state) => state.user.allUser);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState("");
  const [userIndex, setUserIndex] = useState("");
  const [deleteUser, setDeleteUser] = useState(false)
  const alert = useAlert();
  // useEffect(() => {
  //    loadDataTableCss();
  //    loadDataTableScript();
  // }, []);




  useEffect(() => {
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
  }, [deleteUser]);

  // fpr update tender
  // const UpdateTender = (e, item) => {
  //   e.preventDefault();
  //   //  props.history.push(`/create-tender-step1/${id}`)
  //   localStorage.setItem("selected_tender", JSON.stringify(item));
  //   props.history.push("/edit-tender-step1");
  // };

  const userShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/user/user/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUserInfo(json.user);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setUserIndex(index);
  };


  
  const removeUser = (item) => {
    fetch(`${SERVER_URL}api/user/user/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
         alert.success('User deleted successfully!')
         setDeleteUser(!deleteUser)
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

  };
  
  const editUser = (item) =>{

      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: item
      })

  }

  return (
    <Fragment>
      <div className="wrapper">
        <Header />
        <SideNav />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              All User
              <small>Details</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Users</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">All User Detail</h3>
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
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone no</th>
                          <th>Address</th>
                          <th>Created at</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alluser.length < 1
                          ? "No user exist"
                          : alluser !== null && alluser.length > 0
                          ? alluser.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.created_at}</td>
                                <td>
                                  <Link to="/user-edit">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editUser(item)}
                                    ></i>
                                  </Link>
                                  <i
                                    className="fa fa-fw fa-eye"
                                    style={{ color: "#3c8dbc" }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    onClick={() =>
                                      userShowInModal(item, index + 1)
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-fw fa-remove"
                                    style={{ color: "red" }}
                                    onClick={() => removeUser(item)}
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
      {/* ./wrapper */}

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
                User Detail
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
                       Email
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Phone
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Address
                        </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                      Created at
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {userInfo !== "" &&
                          userInfo !== null &&
                          userInfo !== undefined ? (
                    <tr>
                      <td className="tr">{userInfo.name}</td>
                      <td className="tr">{userInfo.email}</td>
                      <td className="tr">{userInfo.phone}</td>
                      <td className="tr">{userInfo.address}</td>
                      <td className="tr">{userInfo.created_at}</td>
                       </tr>
                     ) : "no user exist with id"}
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

export default User;
