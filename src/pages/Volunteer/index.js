import React, { Fragment } from 'react';
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import Footer from '../../components/Footer';

const Volunteer = () => {
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
                          <th>Email</th>
                          <th>Phone no</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Rehman Ali</td>
                          <td>abc@gmail.com</td>
                          <td>0311787829</td>
                          <td>Block b sir syed towm</td>
                          <td>tesing</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Rehman Ali</td>
                          <td>abc@gmail.com</td>
                          <td>0311787829</td>
                          <td>Block b sir syed towm</td>
                          <td>tesing</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Rehman Ali</td>
                          <td>abc@gmail.com</td>
                          <td>0311787829</td>
                          <td>Block b sir syed towm</td>
                          <td>tesing</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Rehman Ali</td>
                          <td>abc@gmail.com</td>
                          <td>0311787829</td>
                          <td>Block b sir syed towm</td>
                          <td>tesing</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Rehman Ali</td>
                          <td>abc@gmail.com</td>
                          <td>0311787829</td>
                          <td>Block b sir syed towm</td>
                          <td>tesing</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Rehman Ali</td>
                          <td>abc@gmail.com</td>
                          <td>0311787829</td>
                          <td>Block b sir syed towm</td>
                          <td>tesing</td>
                        </tr>
                        <tfoot>
                        
                          
                        </tfoot>
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
    </Fragment>
  );
};

export default Volunteer;
