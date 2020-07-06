import React, { Fragment, useState } from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';

const EditNews = props => {
 const newsData = useSelector((state) => state.news.editNews);
 const alert = useAlert();
 
  const [title, setTitle] = useState(newsData.length > 0 ? newsData[0].title : '');
  const [location, setLocation] = useState(newsData.length > 0 ? newsData[0].location : '');
  const [description, setDescription] = useState(newsData.length > 0 ? newsData[0].description : '');
 
  // for error handling
  const [titleError, setTitleError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));


const onChangeTitle= (e) =>{
  setTitleError('')
  setTitle(e.target.value);
  
}

const onChangeLocation= (e) =>{
  setLocationError('')
  setLocation(e.target.value);
  
}
const onChangeDescription= (e) =>{
  setDescriptionError('')
  setDescription(e.target.value);
  
}





const onSubmit = (e) => {
  e.preventDefault();

  if (title === "") {
    setTitleError("Please Enter Title!");
  } else if (location === "") {
    setLocationError("Please Enter location!");
  } else if (description === "") {
    setDescriptionError("Please Enter Description!");
  } else {
    

    const data = {
        title: title,
        location: location,
        description: description,
    };


    fetch(`${SERVER_URL}api/news/news/`+ newsData[0]._id, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
       'X-Auth-Token': user.token,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(json => {
        alert.success(json.msg)
        // setLoading(false)
        props.history.push('/news')
      })
      .catch(error => {
        
        alert.error('Invalid Activity Try Again!')
      });

  

   }
     
};
 
 
 
  return (
    <Fragment>
      <div className="wrapper">
        <Header />
        {/* Left side column. contains the logo and sidebar */}
        <SideNav />

        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content-header">
            <h1 className="header-title">Edit News:</h1>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box profile-box">
                  {/* /.box-header */}
                  <div className="box-body">
                    <div className="row">
                      {/* /.col */}

                      <div className="col-md-9">
                        <p>
                          <div>
                            <h4>
                              <b>News Data:</b>
                            </h4>
                          </div>
                        </p>

                        <form role="form">
                        <div className="col-sm-6">
                          
                          <div className="box-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Title"
                                 name="title"
                                 value={title}
                                 onChange={(e) => onChangeTitle(e)}

                              />
                               <p
                                  style={{ color: "red" }}
                               >{titleError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Location
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter text"
                                name="location"
                                value={location}
                                onChange={(e) => onChangeLocation(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{locationError}</p> 
                          
                            </div>
                             </div>
                          </div>
                          <div className="col-sm-6">
                          
                          <div className="box-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Description 
                                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter text"
                                name="description"
                                value={description}
                                onChange={(e)=> onChangeDescription(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{descriptionError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                image
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                              />
                            </div>
                          </div>
                          </div>
                          {/* /.box-body */}
                           </form>
                      </div>
                      <div className="col-md-3"></div>
                      {/* /.col */}
                    </div>
                    {/* /.row */}
                  </div>
                  <div className="box-footer">
                  <button type="submit" className="btn btn-primary pull-right"
                  onClick={(e) => onSubmit(e)}
                  >
                              Submit
                            </button>

                  </div>
                </div>
                {/* /.box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </section>
        </div>

        {/* <Footer /> */}
      </div>
    </Fragment>
  );
};

export default EditNews;
