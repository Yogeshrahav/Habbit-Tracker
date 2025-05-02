import React from 'react';
import NaviBar from './NaviBar';

const Layout = ({ children }) => {
  return (
    <>
      <NaviBar />
      <div style={{ paddingTop: '60px' }}>
        {children}
      </div>
    </>
  );
};
  

export default Layout;
