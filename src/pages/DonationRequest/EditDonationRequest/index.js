import React, { Fragment, useState } from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';

const EditDonationRequest = props => {
//   const donationRequestData = useSelector((state) => state.donationRequest.editDonationRequest);
//   const alert = useAlert();
 
//   const [name, setName] = useState(donationRequestData.length > 0 ? donationRequestData[0].name : '');
//   const [landline_no, setLandline_no] = useState(donationRequestData.length > 0 ? donationRequestData[0].landline_no : '');
//   const [address, setAddress] = useState(donationRequestData.length > 0 ? donationRequestData[0].address : '');
//   const [phone, setPhone] = useState(donationRequestData.length > 0 ? donationRequestData[0].phone : '');
//   const [email, setEmail] = useState(donationRequestData.length > 0 ? donationRequestData[0].email : '');
//   const [country, setCountry] = useState(donationRequestData.length > 0 ? donationRequestData[0].country : '');
//   const [state, setState] = useState(donationRequestData.length > 0 ? donationRequestData[0].state : '');
//   const [city, setCity] = useState(donationRequestData.length > 0 ? donationRequestData[0].city : '');
//   const [description, setDescription] = useState(donationRequestData.length > 0 ? donationRequestData[0].description : '');
//   const [user_id, setUser_id] = useState(donationRequestData.length > 0 ? donationRequestData[0].user_id : '');
  
  
  
//   // for error handling
//   const [nameError, setNameError] = useState('');
//   const [landline_noError, setLandline_noError] = useState( '');
//   const [addressError, setAddressError] = useState( '');
//   const [phoneError, setPhoneError] = useState('');
//   const [emailError, setEmailError] = useState( '');
//   const [countryError, setCountryError] = useState('');
//   const [stateError, setStateError] = useState('');
//   const [cityError, setCityError] = useState('');
//   const [descriptionError, setDescriptionError] = useState('');
//   const [user_idError, setUser_idError] = useState('');
  
  
//   const user = JSON.parse(localStorage.getItem("user"));


// const onChangeName= (e) =>{
//   setNameError('')
//   setName(e.target.value);
  
// }

// const onChangelanline_no= (e) =>{
//   setLandline_noError('')
//   setLandline_no(e.target.value);
  
// }

// const onChangeAddress= (e) =>{
//   setAddressError('')
//   setAddress(e.target.value);
  
// }

// const onChangePhone= (e) =>{
//   setPhoneError('')
//   setPhone(e.target.value);
  
// }
// const onChangeEmail= (e) =>{
//   setEmailError('')
//   setEmail(e.target.value);
  
// }
// const onChangeCountry= (e) =>{
//   setCountryError('')
//   setCountry(e.target.value);
  
// }
// const onChangeCity= (e) =>{
//   setCityError('')
//   setCity(e.target.value);
  
// }
// const onChangeState= (e) =>{
//   setStateError('')
//   setState(e.target.value);
  
// }
// const onChangeDescription= (e) =>{
//   setDescriptionError('')
//   setDescription(e.target.value);
  
// }

// // const onChangeDescription= (e) =>{
// //   setDescriptionError('')
// //   setDescription(e.target.value);
  
// // }





// const onSubmit = (e) => {
//   e.preventDefault();

//   if (name === "") {
//     setNameError("Please Enter Name!");
//   } else if (category === "") {
//     setCategoryError("Please Enter Category!");
//   } else {
    

//     const data = {
//       product_name: name ,
//       product_category: category,
        
//     };


//     fetch(`${SERVER_URL}api/donationProduct/product/` + donationProductData[0]._id , {
//       method: 'post',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//        'X-Auth-Token': user.token,
//       },
//       body: JSON.stringify(data),
//     })
//       .then(response => response.json())
//       .then(json => {
//         alert.success(json.msg)
//         // setLoading(false)
//         props.history.push('/donation-product')
//       })
//       .catch(error => {
        
//         alert.error('Invalid Activity Try Again!')
//       });

  

//    }
     
// };
 

  return (
    <Fragment>
      <div className="wrapper">
        <Header />
        {/* Left side column. contains the logo and sidebar */}
        <SideNav />

        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <section className="content-header">
            <h1 className="header-title">Edit Donation Product:</h1>
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
                              <b>Donation ProductData:</b>
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
                                // name="name"
                                // value={name}
                                // onChange={(e) => onChangeName(e) }
                              />
                                {/* <p
                                  style={{ color: "red" }}
                               >{nameError}</p>  */}
                          
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
                                // name="category"
                                // value={category}
                                // onChange={(e) => onChangeCategory(e) }
                              />
                                {/* <p
                                  style={{ color: "red" }}
                               >{categoryError}</p>  */}
                          
                            </div>
                            {/* <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Amount
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Amount"
                                name="amount"
                                value={amount}
                                onChange={(e) => onChangeAmount(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{amountError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Image
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="exampleInputEmail1"
                                // placeholder="Enter email"
                              />
                            </div>
                             */}
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
                  // onClick={(e) => onSubmit(e)}
                  
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

export default EditDonationRequest;
