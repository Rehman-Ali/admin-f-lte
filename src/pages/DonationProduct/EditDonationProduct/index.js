import React, { Fragment, useState } from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';

const EditDonationProduct = props => {
  const donationProductData = useSelector((state) => state.donationProduct.editDonationProduct);
  const alert = useAlert();
 
  const [name, setName] = useState(donationProductData.length > 0 ? donationProductData[0].product_name : '');
  const [status, setStatus] = useState(donationProductData.length > 0 ? donationProductData[0].status: '');
  
  // for error handling
  const [nameError, setNameError] = useState('');
  const [statusError, setStatusError] = useState( '');
  
  const user = JSON.parse(localStorage.getItem("user"));


const onChangeName= (e) =>{
  setNameError('')
  setName(e.target.value);
  
}

const onChangeStatus= (e) =>{
  setStatusError('')
  setStatus(e.target.value);
  
}
// const onChangeDescription= (e) =>{
//   setDescriptionError('')
//   setDescription(e.target.value);
  
// }





const onSubmit = (e) => {
  e.preventDefault();

  if (name === "") {
    setNameError("Please Enter Name!");
  } else if (status === "") {
    setStatusError("Please Enter Status!");
  } else {
    

    const data = {
      product_name: name ,
      status: status,
        
    };


    fetch(`${SERVER_URL}api/donationProduct/product/` + donationProductData[0]._id , {
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
        props.history.push('/donation-product')
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
                                name="name"
                                value={name}
                                onChange={(e) => onChangeName(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{nameError}</p> 
                          
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Status
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Status"
                                name="status"
                                value={status}
                                onChange={(e) => onChangeStatus(e) }
                              />
                                <p
                                  style={{ color: "red" }}
                               >{statusError}</p> 
                          
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

export default EditDonationProduct;
