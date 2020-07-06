import React, { Fragment, useState , useEffect} from 'react'
import {useDispatch} from 'react-redux';
 import {useAlert} from 'react-alert';

import {SERVER_URL} from '../../utils/config';
import {LOGIN_FAIL, LOGIN_SUCCESS} from '../../actions/types';

const Login = props => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))
  
   const alert = useAlert() ;
  const onChangeEmail = (e) => {
    setError('');
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setError('');
    setPassword(e.target.value);
  };

  useEffect(() => {
    if(user !== undefined && user !== null ){
        return props.history.push('/') 
      }else if (user === undefined || user === null){
        return props.history.push('/login')
      }
      else{
        return props.history.push('/not-found')
      }
          
  }, [user])   

  const onSubmit = (e) => {
    e.preventDefault();
    if(email === ''){
        setError('Email and Password Invalid!');
    }else if(password === ''){
        setError('Email and Password Invalid!');
    }else{
        setLoading(true);
        let data = {
            email: email,
            password: password,
            
        }
        fetch(`${SERVER_URL}api/user/admin/login`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            //   'X-Auth-Token': this.state.User.token,
            },
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(json => {
              dispatch({
                type: LOGIN_SUCCESS,
                payload: json
              });
              if(json.success === 1){
                localStorage.setItem('user', JSON.stringify(json))
                setLoading(false)
                alert.success('Login successfully!')
              }else{
                setLoading(false)
                alert.error('Invalid credential Please try again!')
              }
              
            })
            .catch(error => {
              dispatch({
                type: LOGIN_FAIL,
                payload: 'Some server Error'
              });
              setLoading(false)
             alert.error('Email and password is Invalid!')
            });
       
 

    }
  }
   
    return (
        <Fragment>
<div className="login-box">
  <div className="login-logo">
    <a href=""><b>Admin</b>HFA</a>
  </div>
  {/* /.login-logo */}
  <div className="login-box-body">
    <p className="login-box-msg">Sign in to start your session</p>
    <form >
      <div className="form-group has-feedback">
        <input type="email" className="form-control" placeholder="Email" 
         name="email"
         value={email}
         onChange={(e) => onChangeEmail(e)}
        />
        <span className="glyphicon glyphicon-envelope form-control-feedback" />
      </div>
      <div className="form-group has-feedback">
        <input type="password" className="form-control"
        name="password"
        value={password}
        onChange={(e) => onChangePassword(e)}
        placeholder="Password" />
        <span className="glyphicon glyphicon-lock form-control-feedback" />
      </div>
      <span style={{color:'red', paddingLeft:'10px'}}>{error}</span>
                          
      <div className="row">
        <div className="col-xs-8">
          <div className="checkbox icheck">
          {/* <a href="#">I forgot my password</a><br /> */}
 
          </div>
        </div>
        {/* /.col */}
        <div className="col-xs-4">
          <button type="submit" onClick={(e) => onSubmit(e)} className="btn btn-primary btn-block btn-flat">{loading ? 'Wait...': 'Sign In' } </button>
        </div>
        {/* /.col */}
      </div>
    </form>
     {/* /.social-auth-links */}
    </div>
  {/* /.login-box-body */}
</div>
 
        </Fragment>
    )
}

export default Login
