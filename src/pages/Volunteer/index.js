import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import Footer from '../../components/Footer';
import { ALL_VOlUNTEER_FAIL, ALL_VOlUNTEER_SUCCESS , EDIT_VOlUNTEER_SUCCESS } from "../../actions/types";
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import {SERVER_URL} from '../../utils/config';
import {Link} from 'react-router-dom';
const Volunteer = () => {

  const allVolunteer = useSelector((state) => state.volunteer.allVolunteer);
  const dispatch = useDispatch();
  const [volunteerInfo, setVolunteerInfo] = useState("");
  const [volunteerIndex, setVolunteerIndex] = useState("");
  const [deleteVolunteer, setDeleteVolunteer] = useState(false)
  const alert = useAlert();
  // useEffect(() => {
  //    loadDataTableCss();
  //    loadDataTableScript();
  // }, []);




  useEffect(() => {
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
  }, [deleteVolunteer]);

  // fpr update tender
  // const UpdateTender = (e, item) => {
  //   e.preventDefault();
  //   //  props.history.push(`/create-tender-step1/${id}`)
  //   localStorage.setItem("selected_tender", JSON.stringify(item));
  //   props.history.push("/edit-tender-step1");
  // };

  const volunteerShowInModal = (item, index) => {
    fetch(`${SERVER_URL}api/volunteer/` + item._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVolunteerInfo(json.volunteer);
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

    setVolunteerIndex(index);
  };


  
  const removeVolunteer = (item) => {
    fetch(`${SERVER_URL}api/volunteer/` + item._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "X-Auth-Token": user.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
         alert.success('User deleted successfully!')
         setDeleteVolunteer(!deleteVolunteer)
      })
      .catch((error) => {
        alert.error("Some Invalid Activity Please Try Again!");
      });

  };
  
  const editVolunteer = (item) =>{

      dispatch({
        type: EDIT_VOlUNTEER_SUCCESS,
        payload: item
      })

  }

 
 console.log('volunteer', volunteerInfo)
  return (
    <Fragment>
      <div className='wrapper'>
        <Header />
        <SideNav />
        <div className='content-wrapper'>
          <section className='content-header'>
            <h1>
              All Volunteer
              <small>Details</small>
            </h1>
            <ol className='breadcrumb'>
              <li>
                <a href='#'>
                  <i className='fa fa-dashboard' /> Home
                </a>
              </li>
              <li className='active'>Volunteer</li>
            </ol>
          </section>
          {/* Main content */}
          <section className='content'>
            {/* Small boxes (Stat box) */}
         
            <div className='row'>
              <div className='col-xs-12'>
                <div className='box'>
                  <div className='box-header'>
                    <h3 className='box-title'>All Volunteer Detail</h3>
                  </div>
                  {/* /.box-header */}
                  <div className='box-body scrolltbl'>
                    <table
                      id='example2'
                      className='table table-bordered table-hover'
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Full Name</th>
                          <th>CNIC</th>
                          <th>Phone no</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {allVolunteer.length < 1
                          ? "No user exist"
                          : allVolunteer !== null && allVolunteer.length > 0
                          ? allVolunteer.map((item, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item.name}</td>
                          <td>{item.cnic}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>
                          {/* <Link to="/volunteer-edit">
                                    <i
                                      className="fa fa-fw fa-pencil"
                                      style={{ color: "green" }}
                                      onClick={() => editVolunteer(item)}
                                    ></i>
                                  </Link> */}
                                  <i
                                    className="fa fa-fw fa-eye"
                                    style={{ color: "#3c8dbc" }}
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    onClick={() =>
                                      volunteerShowInModal(item, index + 1)
                                    }
                                  ></i>
                                  <i
                                    className="fa fa-fw fa-remove"
                                    style={{ color: "red" }}
                                    onClick={() => removeVolunteer(item)}
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
        <div className='control-sidebar-bg' />
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
                Volunteer Detail
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
                       Cnic
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
                      </th>
                      <th
                        className="tr"
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                    Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {volunteerInfo !== "" &&
                          volunteerInfo !== null &&
                          volunteerInfo !== undefined ? (
                    <tr>
                      <td className="tr">{volunteerInfo[0].name}</td>
                      <td className="tr">{volunteerInfo[0].phone}</td>
                      <td className="tr">{volunteerInfo[0].cnic}</td>
                      <td className="tr">{volunteerInfo[0].city}</td>
                      <td className="tr">{volunteerInfo[0].state}</td>
                      <td className="tr">{volunteerInfo[0].country}</td>
                      <td className="tr">{volunteerInfo[0].address}</td>
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

export default Volunteer;
