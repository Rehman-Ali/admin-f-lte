import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../utils/config";
import {
  ALL_NEWS_FAIL,
  ALL_NEWS_SUCCESS,
  EDIT_NEWS_SUCCESS,
} from "../../actions/types";
import { useAlert } from "react-alert";
import axios from "axios";
const News = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const allnews = useSelector((state) => state.news.allNews);
  const dispatch = useDispatch();
  const [newsInfo, setNewsInfo] = useState("");
  const [newsIndex, setNewsIndex] = useState("");
  const [deleteNews, setDeleteNews] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    //  axios.get(`${SERVER_URL}api/news`)
    //  .then((response) => response.json())
    //    .then((json) => {
    //      dispatch({
    //        type: ALL_NEWS_SUCCESS,
    //        payload: json.news,
    //      });
    //    })
    //    .catch((error) => {
    //      dispatch({
    //        type: ALL_NEWS_FAIL,
    //      });
    //    });
    fetch(`${SERVER_URL}api/news`, {
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
          type: ALL_NEWS_SUCCESS,
          payload: json.news,
        });
      })
      .catch((error) => {
        dispatch({
          type: ALL_NEWS_FAIL,
        });
      });
  }, [deleteNews]);

  const newsShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/news/news/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setNewsInfo(json.news[0]);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setNewsIndex(index);
  };

  console.log("new info", newsInfo);

  const removeNews = (item) => {
    fetch(`${SERVER_URL}api/news/news/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        alert.success("News deleted successfully!");
        setDeleteNews(!deleteNews);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });
  };

  const editNews = (item) => {
    dispatch({
      type: EDIT_NEWS_SUCCESS,
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
              All Event
              <small>Details</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fa fa-dashboard" /> Home
                </a>
              </li>
              <li className="active">Events</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header">
                    <h3 className="box-title">All Events Detail</h3>
                    <Link
                      // type="submit"
                      className="btn btn-primary pull-right"
                       style={{marginRight: '25px'}}
                      // onClick={(e) => onSubmit(e)}
                      to="/news-add"
                    >
                      Add News
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
                          <th>Location</th>
                          <th>Description</th>
                          <th>Image</th>
                          <th>Create_at</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allnews.length < 1
                          ? "No news exist"
                          : allnews !== null && allnews.length > 0
                          ? allnews.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.location}</td>
                                <td>{item.description}</td>
                                <td>dummy value</td>
                                <td>{item.created_at}</td>
                                <td>
                                  <Link to="/news-edit">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editNews(item)}
                                    ></i>
                                  </Link>
                                  <i
                                    className="fa fa-fw fa-eye"
                                    style={{ color: "#3c8dbc" }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    onClick={() =>
                                      newsShowInModal(item, index + 1)
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-fw fa-remove"
                                    style={{ color: "red" }}
                                    onClick={() => removeNews(item)}
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
                News Detail
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
                        Location
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        Description
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
                    </tr>
                  </thead>
                  <tbody>
                    {newsInfo !== "" &&
                    newsInfo !== null &&
                    newsInfo !== undefined ? (
                      <tr>
                        <td className="tr">{newsInfo.title}</td>
                        <td className="tr">{newsInfo.location}</td>
                        <td className="tr">{newsInfo.description}</td>
                        <td className="tr">dummy value</td>
                        <td className="tr">{newsInfo.created_at}</td>
                      </tr>
                    ) : (
                      "no news exist with id"
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

export default News;
