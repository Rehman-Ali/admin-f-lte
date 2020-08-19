import React, { Fragment, useState } from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';
import axios from 'axios'
const AddProduct = props => {
  const alert = useAlert();
 
  const user = JSON.parse(localStorage.getItem("user"));

  const [product_name, setProduct_name] = useState('');
  const [images, setImages] = useState('');
  const [product_price, setProduct_price] = useState('');
  const [product_description, setProduct_description] = useState('');
  const [product_type, setProduct_type] = useState('');
  const [product_category, setProduct_category] = useState('');
  
  
  // for error handling
  const [product_nameError, setProduct_nameError] = useState('');
  const [product_priceError, setProduct_priceError] = useState('');
  const [imagesError, setImagesError] = useState('');
  const [product_descriptionError, setProduct_descriptionError] = useState('');
  const [product_typeError, setProduct_typeError] = useState('');
  const [product_categoryError, setProduct_categoryError] = useState('');
  
 

const onChangeProduct_name= (e) =>{
  setProduct_nameError('')
  setProduct_name(e.target.value);
  
}

const onChangeProduct_price= (e) =>{
  setProduct_priceError('')
  setProduct_price(e.target.value);
  
}
const onChangeProduct_category= (e) =>{
  setProduct_categoryError('')
  setProduct_category(e.target.value);
  
}
const onChangeProduct_type= (e) =>{
  setProduct_typeError('')
  setProduct_type(e.target.value);
  
}
const onChangeProduct_description= (e) =>{
  setProduct_descriptionError('')
  setProduct_description(e.target.value);
  
}
const onChangeProduct_image= (e) =>{
  setImagesError('')
  setImages(e.target.value);
  
}

const onFileChange =(event) => {
	let images = [];
    	for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif|PNG|JPEG|JPG)$/))
        // this.setState({ images, message })
	setImages(images)
}



const onSubmit = async(e) => {
  e.preventDefault();
 

  if (product_name === "") {
    setProduct_nameError("Please Enter Name!");
  } else if (product_category === "") {
    setProduct_categoryError("Please Enter category!");
  }else if (product_price === "") {
    setProduct_priceError("Please Enter Product Price!");
  }else if (product_type === "") {
    setProduct_typeError("Please Enter Product type!");
  }else if (product_description === "") {
    setProduct_descriptionError("Please Enter description!");
  }else {
    
  
    var formData = new FormData();
    //   formData.append('name',name)
    //   formData.append('phone',phone)
    //   formData.append('country',country)
    //   formData.append('state',state)
    //   formData.append('description',description)
    //   formData.append('city',city)
    //   formData.append('address',address)
    //   formData.append('landline_no',landline_no)
    //   formData.append('user_id',user.user_id)
    //   formData.append('imgCollection',imgCollection)
	const uploaders = images.map(image => {
				    const data = new FormData();
					data.append("image", image, image.name);
					data.append('product_name', product_name)
					data.append('product_category',product_category)
					data.append('product_price',product_price)
					data.append('product_type',product_type)
					data.append('product_description',product_description)
					
			    	// Make an AJAX upload request using Axios`
			    	return axios.post(`${SERVER_URL}api/product/upload`, data)
			    	.then(response => {
						console.log('response ', response)
					})
				});
		  
        props.history.push('/product')
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
                               Product Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Title"
                                name="product_name"
                                value={product_name}
                                onChange={(e) => onChangeProduct_name(e)}

                              />
                               <p
                                  style={{ color: "red" }}
                               >{product_nameError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Product Category
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Category"
                                name="product_category"
                                value={product_category}
                                onChange={(e) => onChangeProduct_category(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{product_categoryError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Product Price
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Price"
                                name="product_price"
                                value={product_price}
                                onChange={(e) => onChangeProduct_price(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{product_priceError}</p> 
                          
                            </div>
                             </div>
                          </div>
                          <div className="col-sm-6">
                          
                          <div className="box-body">
                          <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Product Type 
                                </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Type"
                                name="description"
                                value={product_type}
                                onChange={(e)=> onChangeProduct_type(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{product_typeError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Description 
                                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter text"
                                name="product_description"
                                value={product_description}
                                onChange={(e)=> onChangeProduct_description(e)}
                              />
                               <p
                                  style={{ color: "red" }}
                               >{product_categoryError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                image
                              </label>
                              <input
                                // type="file"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
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

export default AddProduct;
