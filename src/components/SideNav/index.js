import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';
const SideNav = () => {
    return (
        <Fragment>
            <aside className="main-sidebar">
    {/* sidebar: style can be found in sidebar.less */}
    <section className="sidebar">
      <ul className="sidebar-menu" data-widget="tree">
        <li>
          <Link to="/">
          <i className="fa fa-dashboard" />Dashboard
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
        <li>
          <Link to="/user">
            <i className="fa fa-dashboard" /> <span>Users</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
        <li >
          <Link to="/volunteer">
            <i className="fa fa-dashboard" /> <span>Volunteer</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
        <li>
          <Link to="/donation-request">
            <i className="fa fa-dashboard" /> <span>Donation Request</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
        <li>
          <Link to="/news">
            <i className="fa fa-dashboard" /> <span>News Item</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
 
        <li>
          <Link to="/compaign">
            <i className="fa fa-dashboard" /> <span>Donation Compaign</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
 
        <li >
          <Link to="/product">
            <i className="fa fa-dashboard" /> <span>Our Product</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
        <li >
          <Link to="/donation-product">
            <i className="fa fa-dashboard" /> <span>Donation Product</span>
            {/* <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span> */}
          </Link>
         
        </li>
         </ul>
    </section>
    {/* /.sidebar */}
  </aside>
  
        </Fragment>
    )
}

export default SideNav
