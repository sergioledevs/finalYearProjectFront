import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:"column" }}>
      <Spinner color="success" />
      <h4 style={{ marginTop: '40px'}}>Let us cook...</h4>
    </div>
  );
};

export default Loader;