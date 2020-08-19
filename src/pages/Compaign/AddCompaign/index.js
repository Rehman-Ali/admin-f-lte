import React, { Fragment, useState } from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';
import axios from 'axios';

const AddCompaign = props => {
  const alert = useAlert();
  
   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('');
   const [goal_amount, setGoalAmount] = useState('');
   const [raised_amount, setRaisedAmount] = useState('');
   const [images, setImages] = useState('')
  
   // for error handling
   const [titleError, setTitleError] = useState('');
   const [categoryError, setCategoryError] = useState('');
   const [goal_amountError, setGoalAmountError] = useState('');
   const [raised_amountError, setRaisedAmountError] = useState('');
  
   const user = JSON.parse(localStorage.getItem("user"));
 
 
   
const onFileChange =(event) => {
	let images = [];
    	for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif|PNG|JPEG|JPG)$/))
        // this.setState({ images, message })
	setImages(images)
}

 const onChangeTitle= (e) =>{
   setTitleError('')
   setTitle(e.target.value);
   
 }
 
 const onChangeCategory= (e) =>{
  setCategoryError('')
  setCategory(e.target.value);
   
 }
 const onChangeGoalAmount= (e) =>{
  setGoalAmountError('')
  setGoalAmount(e.target.value);
   
 }
 const onChangeRaisedAmount= (e) =>{
  setRaisedAmountError('')
  setRaisedAmount(e.target.value);
  
}
 
 
 
 
 const onSubmit = (e) => {
   e.preventDefault();
 
   if (title === "") {
     setTitleError("Please Enter Title!");
   } else if (category === "") {
     setCategoryError("Please Enter Category!");
   } else if (goal_amount === "") {
     setGoalAmountError("Please Enter Goal Amount!");
   }else if (raised_amount === "") {
    setRaisedAmountError("Please Enter Raised Amount!");
  }  
   else {
     
 
    //  const data = {
    //      title: title,
    //      category: category,
    //      raised_amount: raised_amount,
    //      goal_amount: goal_amount
    //  };
 
     var formData = new FormData();
     const uploaders = images.map(image => {
             const data = new FormData();
           data.append("image", image, image.name);
           data.append('title',title)
           data.append('raised_amount',raised_amount)
           data.append('category',category)
           data.append('goal_amount',goal_amount)
             // Make an AJAX upload request using Axios`
             return axios.post(`${SERVER_URL}api/compaign/`, data)
             .then(response => {
             console.log('response ', response)
           })
         });
 

 
    //  fetch(`${SERVER_URL}api/compaign/`, {
    //    method: 'post',
    //    headers: {
    //      Accept: 'application/json',
    //      'Content-Type': 'application/json',
    //     'X-Auth-Token': user.token,
    //    },
    //    body: JSON.stringify(data),
    //  })
    //    .then(response => response.json())
    //    .then(json => {
    //      alert.success(json.message)
    //      // setLoading(false)
    //      props.history.push('/compaign')
    //    })
    //    .catch(error => {
         
    //      alert.error('Invalid Activity Try Again!')
    //    });
 
   
 
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
            <h1 className="header-title">Edit Compaign:</h1>
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
                              <b>Compaign Data:</b>
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
                                onChange={(e) => onChangeTitle(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{titleError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Category
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Description"
                                name="category"
                                value={category}
                                onChange={(e) => onChangeCategory(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{categoryError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Goal Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Amount"
                                name="goal_amount"
                                value={goal_amount}
                                onChange={(e) => onChangeGoalAmount(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{goal_amountError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Raised Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Amount"
                                name="raised_amount"
                                value={raised_amount}
                                onChange={(e) => onChangeRaisedAmount(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{raised_amountError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Image
                              </label>
                              <input
                                // type="file"
                                className="form-control"
                                id="exampleInputEmail1"
                                // placeholder="Enter email"
                              type="file" onChange={onFileChange}

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

export default AddCompaign;
