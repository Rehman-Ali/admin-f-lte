import React, { Fragment ,useState, useEffect} from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/config";
import { ALL_COMPAIGN_FAIL, ALL_COMPAIGN_SUCCESS, EDIT_COMPAIGN_SUCCESS } from "../../actions/types";
import { useAlert } from "react-alert";

const Compaign = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allcompaign= useSelector((state) => state.compaign.allCompaign);
  const dispatch = useDispatch();
  const [compaignInfo, setCompaignInfo] = useState("");
  const [compaignIndex, setCompaignIndex] = useState("");
  const [deleteCompaign, setDeleteCompaign] = useState(false)
  const alert = useAlert();
 



  useEffect(() => {
    fetch(`${SERVER_URL}api/compaign`, {
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
          type: ALL_COMPAIGN_SUCCESS,
          payload: json.compaign,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_COMPAIGN_FAIL,
        });
      });
  }, [deleteCompaign]);

  
  const compaignShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/compaign/compaigns/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCompaignInfo(json.compaign[0]);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setCompaignIndex(index);

  };


  

  const removeCompaign = (item) => {
    fetch(`${SERVER_URL}api/compaign/compaign/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
         alert.success('compaign deleted successfully!')
         setDeleteCompaign(!deleteCompaign)
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

  };
  
  const editCompaign = (item) =>{

      dispatch({
        type: EDIT_COMPAIGN_SUCCESS,
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
              All Compaign
              <small>Details</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Compaign</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-xs-12">
                <div className="box ">
                  <div className="box-header">
                    <h3 className="box-title">All Compaign Detail</h3>
                    <Link
                      className="btn btn-primary pull-right"
                       style={{marginRight: '25px'}}
                      // onClick={(e) => onSubmit(e)}
                      to="/add-compaign"
                    >
                      Add Compaign
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
                          <th>Title</th>
                          <th>Category</th>
                          <th>Goal Amount</th>
                          <th>Raised Amount</th>
                          <th>Image</th>
                          <th>Updated at</th>
                          <th>Created at</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {allcompaign.length < 1
                          ? "No data exist"
                          : allcompaign !== null && allcompaign.length > 0
                          ? allcompaign.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.goal_amount}</td>
                                <td>{item.raised_amount}</td>
                                <td>{item.image}</td>
                                <td>{item.updated_at}</td>
                                <td>{item.created_at}</td>
                                <td>
                                  <Link to="/edit-compaign">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editCompaign(item)}
                                    ></i>
                                  </Link>
                                  <i
                                    className="fa fa-fw fa-eye"
                                    style={{ color: "#3c8dbc" }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    onClick={() =>
                                      compaignShowInModal(item, index + 1)
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-fw fa-remove"
                                    style={{ color: "red" }}
                                    onClick={() => removeCompaign(item)}
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
                Compaign Detail
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
                        Title
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Category
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Goal Amount
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                      Raised Amount
                      </th>
                      <th
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
                       Created at
                        </th>
                        <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                       Updated at
                        </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {compaignInfo !== "" &&
                         compaignInfo !== null &&
                         compaignInfo !== undefined ? (
                    <tr>
                      <td className="tr">{compaignInfo.title}</td>
                      <td className="tr">{compaignInfo.category}</td>
                      <td className="tr">{compaignInfo.goal_amount}</td>
                      <td className="tr">{compaignInfo.raised_amount}</td>
                      <td className="tr">{compaignInfo.image}</td>
                      <td className="tr">{compaignInfo.created_at}</td>
                      <td className="tr">{compaignInfo.updated_at}</td>

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

export default Compaign;
