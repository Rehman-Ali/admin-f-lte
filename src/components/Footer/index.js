import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <footer className='main-footer'>
        <div className='pull-right hidden-xs'>
          {/* <b>Version</b> 2.4.13 */}
        </div>
        <strong>
          Copyright © 2020.
        </strong>{' '}
        All rights reserved.
      </footer>
    </Fragment>
  );
};

export default Footer;
