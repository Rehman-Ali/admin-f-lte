import React, { Fragment , useState} from "react";
import Header from "../../../components/Header";
import SideNav from "../../../components/SideNav";
import Footer from "../../../components/Footer";
import {useSelector, useDispatch} from 'react-redux';
import {SERVER_URL} from '../../../utils/config';
import {useAlert} from 'react-alert';

const EditUser = props => {
  const userData = useSelector((state) => state.user.editUser);
 const alert = useAlert();
 
  const [name, setName] = useState(userData.length > 0 ? userData[0].name : '');
  const [email, setEmail] = useState(userData.length > 0 ? userData[0].email : '');
  const [address, setAddress] = useState(userData.length > 0 ? userData[0].address : '');
  const [phoneno, setPhoneno] = useState(userData.length > 0 ? userData[0].phone : '');

  // for error handling
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phonenoError, setPhonenoError] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));


const onChangeName= (e) =>{
  setNameError('')
  setName(e.target.value);
  
}

const onChangeEmail= (e) =>{
  setEmailError('')
  setEmail(e.target.value);
  
}
const onChangeAddress= (e) =>{
  setAddressError('')
  setAddress(e.target.value);
  
}
const onChangePhone= (e) =>{
  setPhonenoError('')
  setPhoneno(e.target.value);
  
}




const onSubmit = (e) => {
  e.preventDefault();

  if (name === "") {
    setNameError("Please Enter name!");
  } else if (email === "") {
    setEmailError("Please Enter email!");
  } else if (address === "") {
    setAddressError("Please Enter address!");
  } else if (phoneno === "") {
    setPhonenoError("Please Enter phone no!");
  } else {
    

    const data = {
        name: name,
        email: email,
        address: address,
        phone: phoneno
    };


    fetch(`${SERVER_URL}api/user/profile/`+ userData[0]._id, {
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
        props.history.push('/user')
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
            <h1 className="header-title">Edit User:</h1>
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
                              <b>User Data:</b>
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
                                placeholder="Enter Name"
                                value={name}
                                name="name"
                                onChange={(e) => onChangeName(e)}
                              />
                             <p
                                  style={{ color: "red" }}
                               >{nameError}</p> 
                            </div>
                            
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={(e) => onChangeEmail(e)}
                              />
                              <p
                                  style={{ color: "red" }}
                               >{emailError}</p>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                 Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={address}
                                placeholder="Enter address"
                                name="address"
                                onChange={(e) => onChangeAddress(e)}
                              />
                              <p
                                  style={{ color: "red" }}
                               >{addressError}</p>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Phone no
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Phone no"
                                value={phoneno}
                                name="phoneno"
                                onChange={(e) => onChangePhone(e)}
                              />
                              <p
                                  style={{ color: "red" }}
                               >{phonenoError}</p>
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
                  <button type="submit" className="btn btn-primary pull-right" onClick={(e) => onSubmit(e)}>
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

        <Footer />
      </div>
    </Fragment>
  );
};

export default EditUser;
