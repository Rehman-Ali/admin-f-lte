import React, { Fragment, useState } from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';

const AddProduct = props => {
  const alert = useAlert();
 
  const [name, setName] = useState('');
  const [category, setCategory] = useState( '');
  
  // for error handling
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState( '');
  
  const user = JSON.parse(localStorage.getItem("user"));


const onChangeName= (e) =>{
  setNameError('')
  setName(e.target.value);
  
}

const onChangeCategory= (e) =>{
  setCategoryError('')
  setCategory(e.target.value);
  
}
// const onChangeDescription= (e) =>{
//   setDescriptionError('')
//   setDescription(e.target.value);
  
// }





const onSubmit = (e) => {
  e.preventDefault();

  if (name === "") {
    setNameError("Please Enter Name!");
  } else if (category === "") {
    setCategoryError("Please Enter Category!");
  } else {
    

    const data = {
      product_name: name ,
      product_category: category,
        
    };


    fetch(`${SERVER_URL}api/product/`, {
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
        alert.success(json.message)
        // setLoading(false)
        props.history.push('/product')
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
            <h1 className="header-title">Edit Product:</h1>
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
                              <b>Product Data:</b>
                            </h4>
                          </div>
                        </p>

                        <form role="form">
                        <div className="col-sm-6">
                          
                          <div className="box-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                               Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Title"
                                name="name"
                                value={name}
                                onChange={(e) => onChangeName(e)}

                              />
                               <p
                                  style={{ color: "red" }}
                               >{nameError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Category
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter text"
                                name="category"
                                value={category}
                                onChange={(e) => onChangeCategory(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{categoryError}</p> 
                          
                            </div>
                             </div>
                          </div>
                          {/* <div className="col-sm-6">
                          
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
                          </div> */}
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

export default AddProduct;
